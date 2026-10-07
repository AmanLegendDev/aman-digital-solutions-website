"use client";

import { Check } from "lucide-react";
import {
  FieldError,
  Section,
  inputClass,
  labelClass,
  textareaClass,
} from "./OfferFormUI";
import type { CommonSectionProps } from "./OfferFormUI";

const SITE_URL = "https://www.amandigitalsolutions.com";

type Props = CommonSectionProps & {
  published: boolean;
};

export default function OfferPublishingSection(props: Props) {
  const {
    register,
    errors,
    published,
  } = props;

  return (
      <Section
        number="03"
        title="SEO & publishing"
        description="Control search previews, social sharing and when the offer is publicly available."
      >
        <div className="space-y-8">
          <div className="space-y-5">
            <div>
              <h3 className="text-base font-semibold text-white">SEO</h3>
              <p className="mt-1 text-sm text-white/35">Control how this offer page is presented to search engines.</p>
            </div>
<div className="grid gap-5">



          <div>

            <label className={labelClass}>

              SEO title

            </label>



            <input

              {...register(

                "seoTitle",

              )}

              placeholder="Diwali Website Offer 2026 | Aman Digital Solutions"

              className={inputClass}

            />



            <FieldError

              message={

                errors.seoTitle

                  ?.message

              }

            />

          </div>



          <div>

            <label className={labelClass}>

              SEO description

            </label>



            <textarea

              {...register(

                "seoDescription",

              )}

              rows={4}

              placeholder="Describe the offer naturally for search results."

              className={textareaClass}

            />



            <FieldError

              message={

                errors

                  .seoDescription

                  ?.message

              }

            />

          </div>



          <div>

            <label className={labelClass}>

              Canonical URL

            </label>



            <input

              {...register(

                "canonicalUrl",

              )}

              placeholder={`${SITE_URL}/offers/example-offer`}

              className={inputClass}

            />



            <FieldError

              message={

                errors.canonicalUrl

                  ?.message

              }

            />

          </div>



        </div>
          </div>
          <div className="space-y-5 border-t border-[#252525] pt-8">
            <div>
              <h3 className="text-base font-semibold text-white">Social / Open Graph</h3>
              <p className="mt-1 text-sm text-white/35">Customize the title and description used when the offer is shared.</p>
            </div>
<div className="grid gap-5">



          <div>

            <label className={labelClass}>

              OG title

            </label>



            <input

              {...register(

                "ogTitle",

              )}

              placeholder="Diwali Offer 2026 | Aman Digital Solutions"

              className={inputClass}

            />



            <FieldError

              message={

                errors.ogTitle

                  ?.message

              }

            />

          </div>



          <div>

            <label className={labelClass}>

              OG description

            </label>



            <textarea

              {...register(

                "ogDescription",

              )}

              rows={4}

              placeholder="Short social sharing description."

              className={textareaClass}

            />



            <FieldError

              message={

                errors.ogDescription

                  ?.message

              }

            />

          </div>



        </div>
          </div>
          <div className="space-y-5 border-t border-[#252525] pt-8">
            <div>
              <h3 className="text-base font-semibold text-white">Publishing</h3>
              <p className="mt-1 text-sm text-white/35">Choose whether the offer is public, featured and where it appears in listings.</p>
            </div>
<div className="grid gap-4 md:grid-cols-3">



          {/* PUBLISHED */}



          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#252525] bg-[#080808] p-4">

            <input

              type="checkbox"

              {...register(

                "published",

              )}

              className="h-4 w-4 accent-[#FFC400]"

            />



            <div>

              <p className="text-sm font-medium text-white">

                Published

              </p>



              <p className="mt-1 text-xs text-white/30">

                Allow the offer to appear publicly.

              </p>

            </div>

          </label>



          {/* FEATURED */}



          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#252525] bg-[#080808] p-4">

            <input

              type="checkbox"

              {...register(

                "featured",

              )}

              className="h-4 w-4 accent-[#FFC400]"

            />



            <div>

              <p className="text-sm font-medium text-white">

                Featured

              </p>



              <p className="mt-1 text-xs text-white/30">

                Highlight this offer.

              </p>

            </div>

          </label>



          {/* DISPLAY ORDER */}



          <div>

            <label className={labelClass}>

              Display order

            </label>



            <input

              type="number"

              min="0"

              {...register(

                "displayOrder",

              )}

              className={inputClass}

            />



            <FieldError

              message={

                errors.displayOrder

                  ?.message

              }

            />

          </div>



        </div>



        {published && (

          <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#FFC400]/20 bg-[#FFC400]/5 p-4">

            <Check

              size={18}

              className="mt-0.5 shrink-0 text-[#FFC400]"

            />



            <div>

              <p className="text-sm font-medium text-[#FFC400]">

                Automatic lifecycle enabled

              </p>



              <p className="mt-1 text-xs leading-5 text-white/40">

                If the start date is in the future,

                this offer will be scheduled.

                When the start date arrives it

                becomes active automatically, and

                after the end date it becomes

                expired automatically.

              </p>

            </div>

          </div>

        )}
          </div>
        </div>
      </Section>
  );
}
