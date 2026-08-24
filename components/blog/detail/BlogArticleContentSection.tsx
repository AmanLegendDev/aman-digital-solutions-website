import {
  ArrowUpRight,
  BookOpen,
} from "lucide-react";

/* =========================================================
   PROPS
========================================================= */

type BlogArticleContentSectionProps = {
  content: string;
};

/* =========================================================
   CONTENT PARSER
========================================================= */

function renderContent(content: string) {
  return content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

/* =========================================================
   COMPONENT
========================================================= */

export default function BlogArticleContentSection({
  content,
}: BlogArticleContentSectionProps) {
  const paragraphs = renderContent(content);

  if (!paragraphs.length) {
    return null;
  }

  return (
    <section className="relative bg-[#050505] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[220px_minmax(0,760px)] lg:gap-16">
          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <div className="border-l border-white/[0.08] pl-5">
                <div className="flex items-center gap-2">
                  <BookOpen
                    size={13}
                    className="text-[#FFC400]"
                  />

                  <span className="text-[9px] font-semibold uppercase tracking-[0.17em] text-[#FFC400]">
                    Article
                  </span>
                </div>

                <p className="mt-4 text-[10px] leading-5 text-neutral-700">
                  Take your time. Good ideas are
                  worth understanding properly.
                </p>

                <div className="mt-7 h-px w-12 bg-[#FFC400]/30" />

                <a
                  href="#article-content"
                  className="mt-6 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-neutral-600 transition-colors hover:text-white"
                >
                  Start reading

                  <ArrowUpRight size={11} />
                </a>
              </div>
            </div>
          </aside>

          {/* =================================================
              ARTICLE
          ================================================= */}

          <article
            id="article-content"
            className="min-w-0"
          >
            {/* MOBILE LABEL */}

            <div className="mb-8 flex items-center gap-2 lg:hidden">
              <span className="h-px w-7 bg-[#FFC400]/40" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.17em] text-[#FFC400]">
                Article
              </span>
            </div>

            {/* CONTENT */}

            <div className="space-y-7">
              {paragraphs.map(
                (paragraph, index) => {
                  const isHeading =
                    paragraph.startsWith("# ");

                  const isSubheading =
                    paragraph.startsWith("## ");

                  const isQuote =
                    paragraph.startsWith("> ");

                  const isList =
                    paragraph
                      .split("\n")
                      .every((line) =>
                        /^[-*•]\s+/.test(
                          line.trim()
                        )
                      );

                  if (isHeading) {
                    return (
                      <h2
                        key={index}
                        className="pt-6 text-2xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-3xl"
                      >
                        {paragraph
                          .replace(/^#\s+/, "")
                          .trim()}
                      </h2>
                    );
                  }

                  if (isSubheading) {
                    return (
                      <h3
                        key={index}
                        className="pt-5 text-xl font-semibold leading-tight tracking-[-0.025em] text-white sm:text-2xl"
                      >
                        {paragraph
                          .replace(/^##\s+/, "")
                          .trim()}
                      </h3>
                    );
                  }

                  if (isQuote) {
                    return (
                      <blockquote
                        key={index}
                        className="border-l-2 border-[#FFC400]/50 bg-[#090909] px-5 py-4 text-base italic leading-7 text-neutral-400 sm:px-6 sm:text-lg sm:leading-8"
                      >
                        {paragraph
                          .replace(/^>\s+/, "")
                          .trim()}
                      </blockquote>
                    );
                  }

                  if (isList) {
                    const items =
                      paragraph
                        .split("\n")
                        .map((item) =>
                          item
                            .replace(
                              /^[-*•]\s+/,
                              ""
                            )
                            .trim()
                        )
                        .filter(Boolean);

                    return (
                      <ul
                        key={index}
                        className="space-y-3 pl-1"
                      >
                        {items.map(
                          (item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="flex gap-3 text-sm leading-7 text-neutral-500 sm:text-base sm:leading-8"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFC400]/70"
                              />

                              <span>
                                {item}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    );
                  }

                  return (
                    <p
                      key={index}
                      className={
                        index === 0
                          ? "text-base leading-8 text-neutral-400 sm:text-lg sm:leading-9"
                          : "text-sm leading-8 text-neutral-500 sm:text-base sm:leading-8"
                      }
                    >
                      {paragraph}
                    </p>
                  );
                }
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}