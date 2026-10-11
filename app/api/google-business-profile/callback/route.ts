
import { NextRequest, NextResponse } from "next/server";
import { createCipheriv, randomBytes } from "node:crypto";
import { MongoClient } from "mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function encryptToken(token: string, keyHex: string) {
  const key = Buffer.from(keyHex, "hex");

  if (key.length !== 32) {
    throw new Error("Token encryption key must be 32 bytes.");
  }

  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);

  const encrypted = Buffer.concat([
    cipher.update(token, "utf8"),
    cipher.final(),
  ]);

  return {
    iv: iv.toString("hex"),
    tag: cipher.getAuthTag().toString("hex"),
    data: encrypted.toString("hex"),
  };
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const oauthError = url.searchParams.get("error");
  const savedState = request.cookies.get("gbp_oauth_state")?.value;

  const fail = (message: string, status = 400) => {
    const response = NextResponse.json(
      { error: message },
      { status }
    );
    response.cookies.delete("gbp_oauth_state");
    return response;
  };

  if (oauthError) {
    return fail(`Google authorization failed: ${oauthError}`);
  }

  if (!state || !savedState || state !== savedState) {
    return fail("Invalid OAuth state. Please start the connection again.");
  }

  if (!code) {
    return fail("Google did not return an authorization code.");
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;
  const mongoUri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME;
  const encryptionKey = process.env.GOOGLE_TOKEN_ENCRYPTION_KEY;

  if (
    !clientId ||
    !clientSecret ||
    !redirectUri ||
    !mongoUri ||
    !encryptionKey
  ) {
    return fail("Required server environment variables are missing.", 500);
  }

  let mongo: MongoClient | undefined;

  try {
    const tokenResponse = await fetch(
      "https://oauth2.googleapis.com/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: "authorization_code",
        }),
        cache: "no-store",
      }
    );

    const tokens = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error("Google token exchange failed:", tokens.error);
      return fail("Google token exchange failed. Check server logs.", 502);
    }

    if (!tokens.refresh_token) {
      return fail(
        "Google did not return a refresh token. Remove this app's existing access from your Google Account and reconnect with consent."
      );
    }

    const encryptedToken = encryptToken(
      tokens.refresh_token,
      encryptionKey
    );

    mongo = new MongoClient(mongoUri);
    await mongo.connect();

    const db = dbName ? mongo.db(dbName) : mongo.db();

    await db.collection("google_oauth_tokens").updateOne(
      { provider: "google-business-profile" },
      {
        $set: {
          provider: "google-business-profile",
          encryptedRefreshToken: encryptedToken,
          scope: tokens.scope,
          tokenType: tokens.token_type,
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    const response = NextResponse.redirect(
      new URL(
  "/admin/dashboard?googleBusinessProfile=connected",
  request.url
)
    );

    response.cookies.delete("gbp_oauth_state");
    return response;
  } catch (error) {
    console.error("Google Business Profile OAuth callback failed:", error);
    return fail("OAuth callback failed. Check server logs.", 500);
  } finally {
    await mongo?.close();
  }
}
