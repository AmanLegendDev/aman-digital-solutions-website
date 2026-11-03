
import {
  FileText,
  ShieldCheck,
} from "lucide-react";
import sanitizeHtml from "sanitize-html";

type OfferDetailTermsProps = {
  terms: string;
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
      "h1",
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

export default function OfferDetailTerms({
  terms,
}: OfferDetailTermsProps) {
  if (!terms?.trim()) {
    return null;
  }

  const safeTerms = sanitizeRichContent(terms);

  if (!safeTerms.trim()) {
    return null;
  }

  return (
    <section
      aria-labelledby="offer-terms-heading"
      className="border-b border-[#1A1A1A] bg-[#050505] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-[#1A1A1A] bg-[#0A0A0A] p-6 sm:p-8 lg:p-10">
          {/* Top accent */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFD400]/30 to-transparent"
          />

          {/* Header */}
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#FFD400]/15 bg-[#FFD400]/[0.06] text-[#FFD400]">
              <FileText
                aria-hidden="true"
                className="h-5 w-5"
              />
            </span>

            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-[#FFD400] uppercase">
                Important information
              </p>

              <h2
                id="offer-terms-heading"
                className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-[#F8FAFC] sm:text-3xl"
              >
                Terms &amp; conditions
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#71717A]">
                Please review the following conditions before claiming
                this offer.
              </p>
            </div>
          </div>

          {/* Rich text content */}
          <div className="mt-8 border-t border-[#1A1A1A] pt-7">
            <div
              className={[
                "offer-rich-content min-w-0 break-words",
                "text-sm leading-7 text-[#A1A1AA] sm:text-[15px] sm:leading-8",
                "[&_p]:mb-4 [&_p:last-child]:mb-0",
                "[&_h1]:mb-4 [&_h1]:mt-8 [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:tracking-tight [&_h1]:text-[#F8FAFC]",
                "[&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-[#F8FAFC]",
                "[&_h3]:mb-3 [&_h3]:mt-7 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#F8FAFC]",
                "[&_h4]:mb-2 [&_h4]:mt-6 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-[#F8FAFC]",
                "[&_strong]:font-semibold [&_strong]:text-[#F8FAFC]",
                "[&_b]:font-semibold [&_b]:text-[#F8FAFC]",
                "[&_em]:italic",
                "[&_u]:underline [&_u]:underline-offset-4",
                "[&_s]:text-[#71717A]",
                "[&_a]:font-medium [&_a]:text-[#FFD400] [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-[#F8FAFC]",
                "[&_ul]:my-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6",
                "[&_ol]:my-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6",
                "[&_li]:pl-1",
                "[&_li::marker]:text-[#FFD400]",
                "[&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-[#FFD400]/50 [&_blockquote]:bg-[#050505] [&_blockquote]:py-3 [&_blockquote]:pl-5 [&_blockquote]:pr-4 [&_blockquote]:text-[#D4D4D8]",
                "[&_hr]:my-7 [&_hr]:border-[#27272A]",
                "[&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm",
                "[&_thead]:bg-[#111111]",
                "[&_th]:border [&_th]:border-[#27272A] [&_th]:bg-[#111111] [&_th]:p-3 [&_th]:text-left [&_th]:font-semibold [&_th]:text-[#F8FAFC]",
                "[&_td]:border [&_td]:border-[#27272A] [&_td]:p-3 [&_td]:text-[#A1A1AA]",
                "[&_img]:my-6 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-2xl",
                "[&_code]:rounded [&_code]:bg-[#111111] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[#FFD400]",
              ].join(" ")}
              dangerouslySetInnerHTML={{
                __html: safeTerms,
              }}
            />
          </div>

          {/* Trust note */}
          <div className="mt-8 flex gap-3 rounded-2xl border border-[#1A1A1A] bg-[#050505] p-4">
            <ShieldCheck
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 text-[#FFD400]"
            />

            <p className="text-xs leading-6 text-[#71717A]">
              Final project scope, requirements and any external costs
              will be confirmed before development begins.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
