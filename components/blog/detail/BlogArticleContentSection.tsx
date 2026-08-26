import {
  ArrowUpRight,
  BookOpen,
} from "lucide-react";

type BlogArticleContentSectionProps = {
  content: string;
};

export default function BlogArticleContentSection({
  content,
}: BlogArticleContentSectionProps) {
  if (!content?.trim()) {
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
                  className="
                    mt-6
                    inline-flex
                    items-center
                    gap-2
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-neutral-600
                    transition-colors
                    hover:text-white
                  "
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

            {/* =================================================
                TIPTAP HTML CONTENT
            ================================================= */}

            <div
              className="blog-article-content"
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />

          </article>
        </div>
      </div>
    </section>
  );
}