import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  FileText,
  Mail,
} from "lucide-react";

const LAST_UPDATED = "August 25, 2026";

const SECTIONS = [
  {
    number: "01",
    title: "About these terms",
    content: (
      <>
        <p>
          These Terms of Service govern the use of the Aman Digital
          Solutions website and the provision of digital services by
          Aman Digital Solutions.
        </p>

        <p>
          By using this website, submitting an enquiry, requesting a
          proposal, booking a project, or engaging Aman Digital
          Solutions for services, you acknowledge that you have read
          and understood these Terms.
        </p>

        <p>
          These Terms should be read together with any proposal,
          quotation, scope of work, invoice, project confirmation,
          or other written agreement issued for a particular project.
          Where a project-specific written agreement contains terms
          that differ from these general Terms, the project-specific
          agreement will apply to that project to the extent of the
          difference.
        </p>
      </>
    ),
  },

  {
    number: "02",
    title: "Our services",
    content: (
      <>
        <p>
          Aman Digital Solutions provides digital services including,
          but not limited to:
        </p>

        <ul>
          <li>Website design and development</li>
          <li>UI / UX design</li>
          <li>E-commerce development</li>
          <li>SEO and website performance work</li>
          <li>Business-focused digital solutions</li>
          <li>Custom web applications and digital products</li>
          <li>Website maintenance and related digital services</li>
        </ul>

        <p>
          The exact services, features, deliverables, technologies,
          integrations, timelines and pricing for a project will be
          defined in the relevant proposal or project scope.
        </p>
      </>
    ),
  },

  {
    number: "03",
    title: "Project enquiry and booking",
    content: (
      <>
        <p>
          Submitting an enquiry or requesting a proposal does not
          automatically create a client relationship or reserve
          project availability.
        </p>

        <p>
          A project is considered confirmed only after the agreed
          project terms have been accepted and the required advance
          payment has been received.
        </p>

        <div className="callout">
          <CheckCircle2 size={18} />
          <div>
            <strong>50% advance to begin</strong>
            <p>
              A 50% advance payment is normally required to confirm
              and begin a project.
            </p>
          </div>
        </div>

        <p>
          The remaining 50% is normally due before final delivery,
          launch, or handover of the completed project, unless a
          different payment schedule has been agreed in writing.
        </p>
      </>
    ),
  },

  {
    number: "04",
    title: "Pricing and quotations",
    content: (
      <>
        <p>
          Pricing displayed on the website may be indicative,
          starting-from pricing, or based on a particular service
          configuration. It should not automatically be treated as a
          final project quotation.
        </p>

        <p>
          A final quotation may depend on the project's scope,
          number of pages, functionality, integrations, content,
          design requirements, technical complexity, third-party
          services, and other requirements.
        </p>

        <p>
          A quotation remains subject to the validity period stated
          in that quotation. If no validity period is stated, Aman
          Digital Solutions may revise the quotation before project
          confirmation.
        </p>
      </>
    ),
  },

  {
    number: "05",
    title: "Scope of work",
    content: (
      <>
        <p>
          Every project is developed according to the agreed scope.
          The scope may include specific pages, features,
          integrations, designs, content handling, responsive
          behaviour, technical requirements and deliverables.
        </p>

        <p>
          Requests that materially change the agreed scope may be
          treated as additional work. This can include, for example:
        </p>

        <ul>
          <li>New pages not included in the original scope</li>
          <li>New functionality or workflows</li>
          <li>Major changes to an approved design direction</li>
          <li>Additional integrations</li>
          <li>New dashboards or admin functionality</li>
          <li>Substantial content or structural changes</li>
        </ul>

        <p>
          Additional work may require additional fees and/or an
          updated delivery timeline. Where practical, this will be
          communicated and agreed before the additional work begins.
        </p>
      </>
    ),
  },

  {
    number: "06",
    title: "Revisions",
    content: (
      <>
        <p>
          Reasonable revision rounds within the agreed project scope
          are included where stated in the proposal or package.
        </p>

        <div className="callout">
          <CheckCircle2 size={18} />
          <div>
            <strong>Two reasonable revision rounds</strong>
            <p>
              Unless a project proposal states otherwise, two
              reasonable revision rounds within the agreed scope are
              included.
            </p>
          </div>
        </div>

        <p>
          A revision means an adjustment to an existing agreed
          deliverable. A request for a completely new feature,
          page, design direction, functionality, or workflow is not
          automatically considered a revision.
        </p>

        <p>
          Repeated, fragmented, or substantially changing requests
          may affect the project timeline and may be quoted as
          additional work where they go beyond the agreed scope.
        </p>
      </>
    ),
  },

  {
    number: "07",
    title: "Client responsibilities",
    content: (
      <>
        <p>
          Successful project delivery depends on timely cooperation
          from the client.
        </p>

        <p>The client is responsible for providing, where applicable:</p>

        <ul>
          <li>Accurate business information</li>
          <li>Logos, brand assets and approved visual materials</li>
          <li>Website copy and other required content</li>
          <li>Product, service and pricing information</li>
          <li>Required account or platform access</li>
          <li>Feedback and approvals within a reasonable time</li>
          <li>Other materials specifically required for the project</li>
        </ul>

        <p>
          The client is responsible for ensuring that materials
          supplied to Aman Digital Solutions may legally be used for
          the project and do not knowingly infringe the rights of
          another person or organisation.
        </p>
      </>
    ),
  },

  {
    number: "08",
    title: "Content, images and third-party materials",
    content: (
      <>
        <p>
          Unless specifically agreed otherwise, the client is
          responsible for the accuracy, legality and ownership or
          permitted use of content and materials supplied by the
          client.
        </p>

        <p>
          Third-party fonts, images, icons, software, plugins,
          libraries, APIs, hosting services, payment gateways,
          analytics platforms and other external services may have
          their own licences, pricing and terms.
        </p>

        <p>
          Aman Digital Solutions does not transfer ownership of
          third-party assets where those assets are governed by
          separate licences.
        </p>
      </>
    ),
  },

  {
    number: "09",
    title: "Project timelines",
    content: (
      <>
        <p>
          Estimated delivery timelines are based on the agreed
          scope, project complexity and timely client cooperation.
        </p>

        <p>
          A timeline may change when there are delays caused by
          missing content, delayed feedback, delayed approvals,
          third-party services, scope changes, technical issues
          outside our reasonable control, or other circumstances
          affecting the project.
        </p>

        <p>
          Aman Digital Solutions will make reasonable efforts to
          communicate material timeline changes when they become
          known.
        </p>
      </>
    ),
  },

  {
    number: "10",
    title: "Approvals and communication",
    content: (
      <>
        <p>
          Project approvals, scope confirmations and important
          decisions may be documented through email, messaging,
          project-management tools, proposals, invoices or other
          written communication used by both parties.
        </p>

        <p>
          Once a design, page, feature, scope item or milestone has
          been approved, subsequent requests that materially alter
          the approved work may be treated as additional revisions
          or scope changes.
        </p>
      </>
    ),
  },

  {
    number: "11",
    title: "Payment, cancellation and refunds",
    content: (
      <>
        <p>
          Payments must be made according to the agreed quotation,
          invoice or project payment schedule.
        </p>

        <p>
          The standard project structure is 50% advance to confirm
          and begin the project and 50% before final delivery or
          handover, unless otherwise agreed in writing.
        </p>

        <p>
          If a client cancels a project after work has commenced,
          the amount already paid may be applied toward work already
          performed, time reserved, resources committed, or
          non-recoverable project costs.
        </p>

        <p>
          Where work has not yet commenced, any cancellation or
          refund will be considered according to the specific
          quotation, payment terms and applicable law.
        </p>

        <p>
          Nothing in these Terms is intended to exclude or restrict
          any consumer rights or remedies that cannot legally be
          excluded.
        </p>
      </>
    ),
  },

  {
    number: "12",
    title: "Final delivery and handover",
    content: (
      <>
        <p>
          Final project files, production deployment, credentials,
          source materials or other agreed deliverables may be
          handed over after the project has been completed and the
          applicable outstanding payment has been received.
        </p>

        <p>
          Until the agreed project fees have been paid in full,
          Aman Digital Solutions may withhold final handover of
          unpaid deliverables to the extent permitted by law and the
          applicable agreement.
        </p>
      </>
    ),
  },

  {
    number: "13",
    title: "Ownership and intellectual property",
    content: (
      <>
        <p>
          Ownership and usage rights for custom project deliverables
          will be determined by the project agreement and payment
          status.
        </p>

        <p>
          Unless otherwise agreed in writing, final custom
          deliverables created specifically for the client are
          intended for the client's use after full payment and
          completion of the project.
        </p>

        <p>
          Aman Digital Solutions may retain rights in its pre-existing
          tools, reusable components, development methods, internal
          frameworks, know-how, generic code patterns and other
          materials that were not created exclusively for the client.
        </p>

        <p>
          Open-source software and third-party components remain
          subject to their respective licences.
        </p>
      </>
    ),
  },

  {
    number: "14",
    title: "Portfolio and case studies",
    content: (
      <>
        <p>
          Unless a confidentiality obligation or written agreement
          says otherwise, Aman Digital Solutions may display a
          completed project in its portfolio, website, presentations,
          social media or case studies for promotional purposes.
        </p>

        <p>
          If a client requires confidentiality or does not want a
          project publicly displayed, this should be communicated
          before the project is completed so that an appropriate
          written arrangement can be made.
        </p>
      </>
    ),
  },

  {
    number: "15",
    title: "Website maintenance and post-launch support",
    content: (
      <>
        <p>
          Post-launch support, maintenance, hosting management,
          content updates and ongoing development are included only
          where specifically stated in the relevant service
          agreement or package.
        </p>

        <p>
          New functionality, redesigns, content changes, third-party
          failures or issues caused by modifications made by someone
          other than Aman Digital Solutions may be treated as
          separate work.
        </p>
      </>
    ),
  },

  {
    number: "16",
    title: "Bug fixes and technical issues",
    content: (
      <>
        <p>
          Where applicable, Aman Digital Solutions will make
          reasonable efforts to correct genuine implementation bugs
          in the agreed deliverables identified within the applicable
          support or warranty period.
        </p>

        <p>
          A new feature, change in requirements, content change,
          third-party service failure, hosting issue, browser
          limitation, or modification made outside Aman Digital
          Solutions is not automatically considered a project bug.
        </p>
      </>
    ),
  },

  {
    number: "17",
    title: "SEO, performance and business results",
    content: (
      <>
        <p>
          We may apply technical SEO, accessibility, performance and
          development best practices as part of the agreed service.
        </p>

        <p>
          However, search-engine rankings, organic traffic,
          advertising performance, sales, leads, conversions,
          revenue or other business outcomes depend on many factors
          outside our direct control.
        </p>

        <p>
          Unless expressly guaranteed in a written agreement, no
          specific ranking, traffic, revenue or conversion result is
          promised.
        </p>
      </>
    ),
  },

  {
    number: "18",
    title: "Third-party services",
    content: (
      <>
        <p>
          Projects may depend on services operated by third parties,
          including hosting providers, domain registrars, cloud
          storage providers, payment processors, email providers,
          analytics platforms, APIs, plugins and other technology
          providers.
        </p>

        <p>
          Third-party services may experience downtime, pricing
          changes, policy changes, limitations or technical failures.
          Aman Digital Solutions cannot guarantee the uninterrupted
          availability of services that it does not control.
        </p>
      </>
    ),
  },

  {
    number: "19",
    title: "Website use",
    content: (
      <>
        <p>
          You agree not to use this website to:
        </p>

        <ul>
          <li>Break or attempt to break applicable laws</li>
          <li>Interfere with the security or operation of the website</li>
          <li>Attempt unauthorised access to systems or accounts</li>
          <li>Upload malicious code or harmful material</li>
          <li>Misuse our content, branding or intellectual property</li>
          <li>Attempt to disrupt services for other users</li>
        </ul>
      </>
    ),
  },

  {
    number: "20",
    title: "Confidentiality",
    content: (
      <>
        <p>
          We understand that projects may involve commercially
          sensitive information. We will use reasonable care when
          handling confidential information provided to us for the
          purpose of performing agreed services.
        </p>

        <p>
          Where a project requires formal confidentiality
          obligations, the parties may enter into a separate
          confidentiality or non-disclosure agreement.
        </p>
      </>
    ),
  },

  {
    number: "21",
    title: "Suspension or termination",
    content: (
      <>
        <p>
          Aman Digital Solutions may pause or terminate work where
          there is material non-payment, prolonged lack of required
          client cooperation, unlawful use, abusive behaviour, or a
          material breach of the agreed project terms.
        </p>

        <p>
          Where practical, we will communicate the reason for a
          material suspension or termination and provide an
          opportunity to resolve the issue.
        </p>
      </>
    ),
  },

  {
    number: "22",
    title: "Limitation of liability",
    content: (
      <>
        <p>
          Aman Digital Solutions will provide services with
          reasonable care and skill consistent with the agreed
          scope.
        </p>

        <p>
          To the extent permitted by applicable law, we are not
          responsible for indirect losses arising from matters
          outside the agreed scope or our reasonable control,
          including third-party outages, loss of business
          opportunities, changes to external platforms, or misuse of
          a delivered system.
        </p>

        <p>
          Nothing in these Terms is intended to exclude liability
          that cannot legally be excluded or limited under applicable
          law.
        </p>
      </>
    ),
  },

  {
    number: "23",
    title: "Indemnity",
    content: (
      <>
        <p>
          To the extent permitted by law, a client may be responsible
          for claims arising from materials or instructions supplied
          by the client where the client did not have the necessary
          rights or permissions to provide or use those materials.
        </p>

        <p>
          This provision does not apply where the relevant claim is
          caused by the independent negligence or unlawful conduct of
          Aman Digital Solutions.
        </p>
      </>
    ),
  },

  {
    number: "24",
    title: "Changes to services or these Terms",
    content: (
      <>
        <p>
          We may update our services, website content and these Terms
          from time to time.
        </p>

        <p>
          The latest version will be published on this page with an
          updated effective or revision date. Changes will generally
          apply to future engagements and website use after the
          updated Terms are published, subject to applicable law and
          any existing project agreement.
        </p>
      </>
    ),
  },

  {
    number: "25",
    title: "Governing law and disputes",
    content: (
      <>
        <p>
          These Terms are intended to be interpreted under the laws
          applicable in India.
        </p>

        <p>
          The parties will first attempt to resolve project-related
          concerns through good-faith communication before pursuing
          formal remedies, where appropriate.
        </p>

        <p>
          Nothing in this section prevents a person from exercising
          any mandatory legal right or remedy available under
          applicable law.
        </p>
      </>
    ),
  },

  {
    number: "26",
    title: "Contact",
    content: (
      <>
        <p>
          If you have questions about these Terms, project
          agreements, payments or our services, you can contact us.
        </p>

        <div className="contact-card">
          <Mail size={18} />

          <div>
            <p className="contact-label">Email</p>

            <a href="mailto:hello@amandigitalsolutions.com">
              hello@amandigitalsolutions.com
            </a>
          </div>
        </div>

        <p>
          Aman Digital Solutions
          <br />
          Shimla, Himachal Pradesh
          <br />
          India
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#F5F5F5]">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden border-b border-[#1A1A1A] bg-[#050505]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-[#FFC400]/[0.025] blur-[150px]"
        />

        <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-28 sm:px-8 sm:pb-24 lg:px-10 lg:pt-36">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#292929] bg-[#0D0D0D] text-[#FFC400]">
                <FileText size={14} />
              </span>

              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#FFC400]">
                Legal
              </span>
            </div>

            <h1 className="mt-7 text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.065em]">
              Terms that keep
              <span className="block text-[#FFC400]">
                projects clear.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-[#777] sm:text-base sm:leading-7">
              Clear expectations make better projects. These Terms
              explain how Aman Digital Solutions works with clients,
              including project scope, payments, revisions,
              responsibilities, delivery and other important
              conditions.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] uppercase tracking-[0.16em] text-[#4F4F4F]">
              <span>Terms of Service</span>

              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full bg-[#333]"
              />

              <span>Last updated {LAST_UPDATED}</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="relative">
        <div className="mx-auto grid w-full max-w-7xl gap-14 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24 lg:px-10 lg:py-24">
          {/* SIDE NAV */}

          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#444]">
                On this page
              </p>

              <nav className="mt-5 max-h-[calc(100vh-10rem)] overflow-y-auto pr-3">
                {SECTIONS.map((section) => (
                  <a
                    key={section.number}
                    href={`#terms-${section.number}`}
                    className="group flex gap-3 border-l border-[#1D1D1D] py-2 pl-4 transition-colors hover:border-[#FFC400]/40"
                  >
                    <span className="text-[9px] tabular-nums text-[#444] transition-colors group-hover:text-[#FFC400]">
                      {section.number}
                    </span>

                    <span className="text-xs leading-5 text-[#666] transition-colors group-hover:text-[#A8A8A8]">
                      {section.title}
                    </span>
                  </a>
                ))}
              </nav>

              <Link
                href="/start-a-project"
                className="group mt-8 inline-flex items-center gap-2 text-xs font-medium text-[#8A8A8A] transition-colors hover:text-[#FFC400]"
              >
                Start a project

                <ArrowUpRight
                  size={13}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </aside>

          {/* LEGAL CONTENT */}

          <div className="min-w-0 max-w-3xl">
            {SECTIONS.map((section) => (
              <article
                key={section.number}
                id={`terms-${section.number}`}
                className="scroll-mt-28 border-b border-[#1A1A1A] py-10 first:pt-0 last:border-b-0"
              >
                <div className="flex items-start gap-4">
                  <span className="mt-1 shrink-0 text-[10px] font-medium tabular-nums tracking-[0.14em] text-[#FFC400]">
                    {section.number}
                  </span>

                  <h2 className="text-xl font-semibold tracking-[-0.025em] text-[#F0F0F0] sm:text-2xl">
                    {section.title}
                  </h2>
                </div>

                <div className="legal-copy ml-8 mt-6">
                  {section.content}
                </div>
              </article>
            ))}

            {/* FINAL CTA */}

            <div className="mt-8 rounded-[24px] border border-[#292929] bg-[#0A0A0A] p-6 sm:p-8">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#FFC400]">
                Ready to build?
              </p>

              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-[#F0F0F0]">
                Let&apos;s turn the agreement into actual work.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#777]">
                If you&apos;re ready to discuss your project, send us
                your requirements and we&apos;ll take it from there.
              </p>

              <Link
                href="/start-a-project"
                className="group mt-6 inline-flex items-center gap-2 rounded-full bg-[#FFC400] px-5 py-3 text-xs font-semibold text-black transition-all hover:bg-[#FFD43B] hover:shadow-[0_0_30px_rgba(255,196,0,0.12)]"
              >
                Start a project

                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER NOTE
      ===================================================== */}

      <div className="border-t border-[#1A1A1A]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p className="text-[10px] text-[#444]">
            © {new Date().getFullYear()} Aman Digital Solutions.
            All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-[10px]">
            <Link
              href="/privacy"
              className="text-[#555] transition-colors hover:text-[#FFC400]"
            >
              Privacy
            </Link>

            <Link
              href="/"
              className="text-[#555] transition-colors hover:text-[#FFC400]"
            >
              Back to website
            </Link>
          </div>
        </div>
      </div>

      {/* =====================================================
          LOCAL PAGE STYLES
      ===================================================== */}

      <style jsx>{`
        .legal-copy {
          color: #777;
          font-size: 0.875rem;
          line-height: 1.9;
        }

        .legal-copy :global(p + p) {
          margin-top: 1.15rem;
        }

        .legal-copy :global(ul) {
          margin-top: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          padding-left: 1.2rem;
        }

        .legal-copy :global(li) {
          position: relative;
          padding-left: 0.45rem;
        }

        .legal-copy :global(li)::marker {
          color: #ffc400;
        }

        .callout {
          display: flex;
          gap: 0.8rem;
          margin: 1.5rem 0;
          padding: 1rem 1.1rem;
          border: 1px solid rgba(255, 196, 0, 0.16);
          border-radius: 1rem;
          background: rgba(255, 196, 0, 0.035);
          color: #8a8a8a;
        }

        .callout > svg {
          flex-shrink: 0;
          margin-top: 0.1rem;
          color: #ffc400;
        }

        .callout strong {
          display: block;
          color: #e8e8e8;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: -0.01em;
        }

        .callout p {
          margin-top: 0.25rem !important;
        }

        .contact-card {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          margin: 1.5rem 0;
          padding: 1rem 1.1rem;
          border: 1px solid #202020;
          border-radius: 1rem;
          background: #0a0a0a;
        }

        .contact-card > svg {
          margin-top: 0.15rem;
          flex-shrink: 0;
          color: #ffc400;
        }

        .contact-label {
          margin: 0 !important;
          color: #444;
          font-size: 0.6rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.16em;
        }

        .contact-card a {
          display: inline-block;
          margin-top: 0.25rem;
          color: #bdbdbd;
          transition: color 0.2s ease;
        }

        .contact-card a:hover {
          color: #ffc400;
        }
      `}</style>
    </main>
  );
}