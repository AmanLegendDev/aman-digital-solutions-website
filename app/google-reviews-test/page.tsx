
import {
  createDecipheriv,
} from "node:crypto";
import { MongoClient } from "mongodb";
import Link from "next/link";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type AnyRecord = Record<string, any>;

type ReviewItem = {
  account: string;
  location: string;
  data: AnyRecord;
};

function decryptRefreshToken(
  encrypted: { iv: string; tag: string; data: string },
  keyHex: string
) {
  const key = Buffer.from(keyHex, "hex");

  if (key.length !== 32) {
    throw new Error("GOOGLE_TOKEN_ENCRYPTION_KEY must be 64 hex characters.");
  }

  const decipher = createDecipheriv(
    "aes-256-gcm",
    key,
    Buffer.from(encrypted.iv, "hex")
  );

  decipher.setAuthTag(Buffer.from(encrypted.tag, "hex"));

  return Buffer.concat([
    decipher.update(Buffer.from(encrypted.data, "hex")),
    decipher.final(),
  ]).toString("utf8");
}

async function googleGet(
  url: string,
  accessToken: string
): Promise<AnyRecord> {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      data?.error?.message ||
      data?.error_description ||
      `Google API returned HTTP ${response.status}`;

    throw new Error(message);
  }

  return data;
}

async function getAccessToken(refreshToken: string) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Google OAuth client credentials are missing.");
  }

  const response = await fetch(
    "https://oauth2.googleapis.com/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
      cache: "no-store",
    }
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok || !data.access_token) {
    throw new Error(
      data?.error_description ||
      data?.error ||
      "Could not refresh the Google access token."
    );
  }

  return data.access_token as string;
}

async function fetchAllPages(
  initialUrl: string,
  accessToken: string,
  collectionKey: string
) {
  const all: AnyRecord[] = [];
  let pageToken = "";
  const visitedTokens = new Set<string>();

  for (let page = 0; page < 1000; page++) {
    const url = new URL(initialUrl);

    if (pageToken) {
      url.searchParams.set("pageToken", pageToken);
    }

    const result = await googleGet(url.toString(), accessToken);
    const items = result[collectionKey];

    if (Array.isArray(items)) {
      all.push(...items);
    }

    const next = result.nextPageToken as string | undefined;

    if (!next) break;

    if (visitedTokens.has(next)) {
      throw new Error("Google returned a repeated pagination token.");
    }

    visitedTokens.add(next);
    pageToken = next;
  }

  return all;
}

async function fetchEverything(): Promise<{
  reviews: ReviewItem[];
  accountCount: number;
  locationCount: number;
}> {
  const mongoUri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME;
  const encryptionKey = process.env.GOOGLE_TOKEN_ENCRYPTION_KEY;

  if (!mongoUri || !encryptionKey) {
    throw new Error("MongoDB or token encryption environment variables are missing.");
  }

  const mongo = new MongoClient(mongoUri);

  try {
    await mongo.connect();

    const db = dbName ? mongo.db(dbName) : mongo.db();

    const saved = await db
      .collection("google_oauth_tokens")
      .findOne({ provider: "google-business-profile" });

    if (!saved?.encryptedRefreshToken) {
      throw new Error("Google is not connected yet. Use the Connect Google button.");
    }

    const refreshToken = decryptRefreshToken(
      saved.encryptedRefreshToken,
      encryptionKey
    );

    const accessToken = await getAccessToken(refreshToken);

    const accounts = await fetchAllPages(
      "https://mybusinessaccountmanagement.googleapis.com/v1/accounts",
      accessToken,
      "accounts"
    );

    const reviews: ReviewItem[] = [];
    let locationCount = 0;

    for (const account of accounts) {
      const accountName = String(account.name || "");
      const accountId = accountName.split("/").pop();

      if (!accountId) continue;

      const locations = await fetchAllPages(
        `https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations?readMask=name,title,storeCode,metadata&pageSize=100`,
        accessToken,
        "locations"
      );

      for (const location of locations) {
        const locationName = String(location.name || "");
        const locationId = locationName.split("/").pop();

        if (!locationId) continue;

        locationCount++;

        const reviewUrl =
          `https://mybusiness.googleapis.com/v4/accounts/${accountId}` +
          `/locations/${locationId}/reviews?pageSize=50`;

        const locationReviews = await fetchAllPages(
          reviewUrl,
          accessToken,
          "reviews"
        );

        for (const review of locationReviews) {
          reviews.push({
            account: accountName,
            location: location.title || locationName,
            data: review,
          });
        }
      }
    }

    return {
      reviews,
      accountCount: accounts.length,
      locationCount,
    };
  } finally {
    await mongo.close();
  }
}

function display(value: unknown) {
  if (value === null || value === undefined || value === "") {
    return "Not provided by Google";
  }

  if (typeof value === "object") {
    return JSON.stringify(value, null, 2);
  }

  return String(value);
}

function readableDate(value: unknown) {
  if (typeof value !== "string") return "Date not provided";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });
}

function ReviewCard({ item, index }: { item: ReviewItem; index: number }) {
  const review = item.data;
  const reviewer = review.reviewer || {};
  const rating = String(review.starRating || "Not rated");
  const ratingNumber = Number(rating.replace("STAR_RATING_", ""));

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white p-5">
        <div className="flex items-start gap-3">
          {reviewer.profilePhotoUrl ? (
            <img
              src={reviewer.profilePhotoUrl}
              alt=""
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">
              {(reviewer.displayName || "G").charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <h2 className="font-semibold text-slate-900">
              {reviewer.displayName || "Google reviewer"}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Review #{index + 1} · {item.location}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {readableDate(review.createTime)}
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-amber-50 px-3 py-2 text-right">
          <div className="text-lg tracking-wider text-amber-500">
            {"★".repeat(Number.isFinite(ratingNumber) ? ratingNumber : 0)}
          </div>
          <div className="text-xs font-semibold text-amber-800">
            {rating}
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5">
        <section>
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            Customer comment
          </h3>
          <p className="whitespace-pre-wrap break-words leading-7 text-slate-700">
            {review.comment || "No written comment — rating-only review."}
          </p>
        </section>

        <section className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Review ID</p>
            <p className="mt-1 break-all text-sm font-medium text-slate-800">
              {review.reviewId || review.name || "Not provided"}
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Last updated</p>
            <p className="mt-1 text-sm font-medium text-slate-800">
              {readableDate(review.updateTime)}
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Reviewer profile URL</p>
            <p className="mt-1 break-all text-sm text-slate-800">
              {reviewer.profileUrl || "Not provided by Google"}
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Business location</p>
            <p className="mt-1 break-words text-sm text-slate-800">
              {item.location}
            </p>
          </div>
        </section>

        {review.reviewReply && (
          <section className="rounded-xl border border-blue-100 bg-blue-50 p-4">
            <h3 className="mb-2 text-sm font-semibold text-blue-950">
              Business owner reply
            </h3>
            <p className="whitespace-pre-wrap text-sm leading-6 text-blue-900">
              {review.reviewReply.comment || "Reply text not provided"}
            </p>
            <p className="mt-2 text-xs text-blue-700">
              Updated: {readableDate(review.reviewReply.updateTime)}
            </p>
          </section>
        )}

        <details className="rounded-xl border border-slate-200">
          <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-slate-700">
            View every field returned by Google
          </summary>
          <pre className="overflow-x-auto whitespace-pre-wrap break-words border-t border-slate-200 bg-slate-950 p-4 text-xs leading-5 text-emerald-100">
            {JSON.stringify(review, null, 2)}
          </pre>
        </details>
      </div>
    </article>
  );
}

export default async function GoogleReviewsTestPage() {
  let result: Awaited<ReturnType<typeof fetchEverything>> | null = null;
  let error = "";

  try {
    result = await fetchEverything();
  } catch (e) {
    error = e instanceof Error ? e.message : "Could not fetch Google reviews.";
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 overflow-hidden rounded-3xl bg-slate-950 p-7 text-white sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-300">
            Aman Digital Solutions
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Google Reviews Lab
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-slate-300">
            Temporary testing dashboard for all reviews accessible through
            your connected Google Business Profile accounts and locations.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/api/google-business-profile/connect"
              className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 hover:bg-blue-50"
            >
              Connect Google Account
            </a>
            <a
              href="/google-reviews-test"
              className="rounded-xl border border-slate-600 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Refresh reviews
            </a>
          </div>
        </header>

        {error ? (
          <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <h2 className="text-lg font-bold text-amber-950">
              Reviews are not available yet
            </h2>
            <p className="mt-2 break-words leading-7 text-amber-900">
              {error}
            </p>
            <p className="mt-3 text-sm text-amber-800">
              Check the OAuth connection, API activation and server environment
              variables. The full error will help identify the next fix.
            </p>
          </section>
        ) : result ? (
          <>
            <section className="mb-7 grid gap-4 sm:grid-cols-3">
              {[
                ["Reviews fetched", result.reviews.length],
                ["Accounts discovered", result.accountCount],
                ["Locations discovered", result.locationCount],
              ].map(([label, value]) => (
                <div
                  key={String(label)}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <p className="text-sm text-slate-500">{label}</p>
                  <p className="mt-2 text-3xl font-bold">{value}</p>
                </div>
              ))}
            </section>

            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold">All fetched reviews</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Full review data is available inside each card.
                </p>
              </div>
              <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">
                Fetch complete
              </span>
            </div>

            {result.reviews.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
                No reviews were returned for the discovered locations.
              </div>
            ) : (
              <div className="space-y-5">
                {result.reviews.map((item, index) => (
                  <ReviewCard
                    key={
                      item.data.reviewId ||
                      item.data.name ||
                      `${item.location}-${index}`
                    }
                    item={item}
                    index={index}
                  />
                ))}
              </div>
            )}
          </>
        ) : null}

        <footer className="mt-10 text-xs leading-6 text-slate-500">
          Temporary diagnostics page. Restrict access before deploying it
          publicly; do not expose tokens or OAuth secrets in browser code.
        </footer>
      </div>
    </main>
  );
}
