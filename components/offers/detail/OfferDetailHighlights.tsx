
import { Check, Sparkles } from "lucide-react";
import sanitizeHtml from "sanitize-html";

type OfferDetailHighlightsProps = {
  highlights: string[];
  description: string;
};

const sanitizeRichContent = (html: string) =>
  sanitizeHtml(html, {
    allowedTags: [
      "p",
      "br",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "h2",
      "h3",
      "h4",
      "ul",
      "ol",
      "li",
      "blockquote",
      "hr",
      "a",
      "img",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "code",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "title", "width", "height"],
      th: ["colspan", "rowspan"],
      td: ["colspan", "rowspan"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        rel: "noopener noreferrer",
      }),
    },
  });

export default function OfferDetailHighlights({
  highlights,
  description,
}: OfferDetailHighlightsProps) {
  const visibleHighlights = highlights.filter(
    (item) => item.trim().length > 0,
  );

  const safeDescription = sanitizeRichContent(description || "");

  return (
    <section
      aria-labelledby="offer-highlights-heading"
      className="border-b border-[#1A1A1A] bg-[#050505] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          {/* Offer description */}
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-[#FFD400] uppercase">
              <Sparkles
                aria-hidden="true"
                className="h-3.5 w-3.5"
              />
              The offer
            </div>

            <h2
              id="offer-highlights-heading"
              className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#F8FAFC] sm:text-4xl"
            >
              Built around what your business actually needs.
            </h2>

            {safeDescription.trim() && (
              <div
                className={[
                  "offer-rich-content mt-6 max-w-xl",
                  "text-sm leading-7 text-[#A1A1AA] sm:text-base sm:leading-8",
                  "[&_p]:mb-4 [&_p:last-child]:mb-0",
                  "[&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-[#F8FAFC]",
                  "[&_h3]:mb-3 [&_h3]:mt-7 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#F8FAFC]",
                  "[&_h4]:mb-2 [&_h4]:mt-6 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-[#F8FAFC]",
                  "[&_strong]:font-semibold [&_strong]:text-[#F8FAFC]",
                  "[&_b]:font-semibold [&_b]:text-[#F8FAFC]",
                  "[&_em]:italic",
                  "[&_u]:underline [&_u]:underline-offset-4",
                  "[&_a]:font-medium [&_a]:text-[#FFD400] [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-[#F8FAFC]",
                  "[&_ul]:my-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6",
                  "[&_ol]:my-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6",
                  "[&_li]:pl-1",
                  "[&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-[#FFD400]/50 [&_blockquote]:bg-[#0A0A0A] [&_blockquote]:py-3 [&_blockquote]:pl-5 [&_blockquote]:pr-4 [&_blockquote]:text-[#D4D4D8]",
                  "[&_hr]:my-7 [&_hr]:border-[#27272A]",
                  "[&_img]:my-6 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-2xl",
                  "[&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm",
                  "[&_th]:border [&_th]:border-[#27272A] [&_th]:bg-[#111111] [&_th]:p-3 [&_th]:text-left [&_th]:font-semibold [&_th]:text-[#F8FAFC]",
                  "[&_td]:border [&_td]:border-[#27272A] [&_td]:p-3 [&_td]:text-[#A1A1AA]",
                  "[&_code]:rounded [&_code]:bg-[#111111] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[#FFD400]",
                ].join(" ")}
                dangerouslySetInnerHTML={{
                  __html: safeDescription,
                }}
              />
            )}
          </div>

          {/* Highlights */}
          <div className="min-w-0">
            {visibleHighlights.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {visibleHighlights.map((highlight, index) => (
                  <div
                    key={`${highlight}-${index}`}
                    className="group rounded-2xl border border-[#1A1A1A] bg-[#0A0A0A] p-5 transition duration-300 hover:border-[#FFD400]/20 hover:bg-[#0D0D0D]"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#FFD400]/15 bg-[#FFD400]/[0.06] text-[#FFD400] transition group-hover:border-[#FFD400]/25 group-hover:bg-[#FFD400]/10">
                      <Check
                        aria-hidden="true"
                        className="h-4 w-4"
                        strokeWidth={2.5}
                      />
                    </span>

                    <p className="mt-5 text-sm font-medium leading-6 text-[#D4D4D8]">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-[#1A1A1A] bg-[#0A0A0A] p-6 text-sm text-[#71717A]">
                The offer scope will be confirmed during the project
                discussion.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
