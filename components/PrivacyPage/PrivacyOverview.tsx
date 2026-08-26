import { FileText } from "lucide-react";

export default function PrivacyOverview() {
  return (
    <section className="bg-[#080808]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          {/* LABEL */}
          <div>
            <div className="inline-flex items-center gap-2 text-sm font-medium text-[#FFC400]">
              <FileText size={17} />
              Privacy Policy
            </div>

            <h2 className="mt-4 max-w-sm text-2xl font-semibold tracking-[-0.035em] text-white sm:text-3xl">
              A clear approach to your information.
            </h2>
          </div>

          {/* CONTENT */}
          <div className="max-w-3xl space-y-5 text-[15px] leading-7 text-neutral-400 sm:text-base">
            <p>
              Aman Digital Solutions respects the privacy of people who visit
              our website, contact us, request a quote or work with us on a
              digital project.
            </p>

            <p>
              We only collect information that is reasonably necessary for
              communicating with you, understanding your requirements,
              providing our services, improving our website and fulfilling
              legitimate business or legal obligations.
            </p>

            <p>
              This policy is intended to explain our approach in clear
              language. It covers information submitted through our website,
              information provided during business communication and certain
              technical information that may be generated when you use our
              website.
            </p>

            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 sm:p-6">
              <p className="text-sm leading-6 text-neutral-300">
                <span className="font-semibold text-white">
                  In short:
                </span>{" "}
                we do not treat your personal information as a product. We use
                information for legitimate business purposes and take
                reasonable steps to protect it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}