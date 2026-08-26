import {
  UserRound,
  Cookie,
  Settings2,
  Mail,
} from "lucide-react";

const rights = [
  {
    title: "Access",
    description:
      "You may ask us what personal information we hold about you and request access to that information where applicable.",
  },
  {
    title: "Correction",
    description:
      "If information we hold about you is inaccurate or incomplete, you may ask us to correct or update it.",
  },
  {
    title: "Deletion",
    description:
      "In appropriate circumstances, you may ask us to delete personal information, subject to legal or legitimate business requirements.",
  },
  {
    title: "Withdraw consent",
    description:
      "Where processing relies on your consent, you may withdraw that consent, subject to any applicable limitations.",
  },
];

export default function RightsAndCookies() {
  return (
    <section className="border-y border-white/[0.06] bg-[#0A0A0A]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          {/* RIGHTS */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#FFC400]/15 bg-[#FFC400]/[0.05] text-[#FFC400]">
                <UserRound size={18} />
              </div>

              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#FFC400]">
                Your choices
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              Your information, your rights.
            </h2>

            <p className="mt-5 text-[15px] leading-7 text-neutral-400 sm:text-base">
              Depending on applicable law and the circumstances, you may have
              rights concerning the personal information we hold about you.
            </p>

            <div className="mt-8 divide-y divide-white/[0.07] rounded-2xl border border-white/[0.07] bg-white/[0.02]">
              {rights.map((right) => (
                <div key={right.title} className="p-5 sm:p-6">
                  <h3 className="text-sm font-semibold text-white">
                    {right.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-neutral-500">
                    {right.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* COOKIES */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#FFC400]/15 bg-[#FFC400]/[0.05] text-[#FFC400]">
                <Cookie size={18} />
              </div>

              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#FFC400]">
                Cookies
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              A better experience, without unnecessary tracking.
            </h2>

            <p className="mt-5 text-[15px] leading-7 text-neutral-400 sm:text-base">
              Our website may use cookies or similar technologies that are
              necessary for functionality, security, preferences or other
              legitimate website operations.
            </p>

            <div className="mt-8 space-y-3">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                <div className="flex gap-4">
                  <Settings2
                    size={18}
                    className="mt-0.5 shrink-0 text-[#FFC400]"
                  />

                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Managing cookies
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-neutral-500">
                      Most browsers allow you to control or delete cookies
                      through their settings. Disabling certain cookies may
                      affect parts of the website.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                <div className="flex gap-4">
                  <Mail
                    size={18}
                    className="mt-0.5 shrink-0 text-[#FFC400]"
                  />

                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Questions about your information?
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-neutral-500">
                      If you want to exercise an applicable privacy right or
                      have a question about how your information is handled,
                      contact us using the details provided below.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}