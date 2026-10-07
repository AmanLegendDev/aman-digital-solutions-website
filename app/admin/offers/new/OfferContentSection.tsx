"use client";

import { Plus, Trash2 } from "lucide-react";
import {
  FieldError,
  Section,
  inputClass,
  labelClass,
  textareaClass,
} from "./OfferFormUI";
import type { CommonSectionProps } from "./OfferFormUI";

type Props = CommonSectionProps & {
  highlights: string[];
  includedFeatures: string[];
  updateHighlight: (index: number, value: string) => void;
  appendHighlight: () => void;
  removeHighlight: (index: number) => void;
  updateFeature: (index: number, value: string) => void;
  appendFeature: () => void;
  removeFeature: (index: number) => void;
};

export default function OfferContentSection(props: Props) {
  const {
    register,
    errors,
    highlights,
    includedFeatures,
    updateHighlight,
    appendHighlight,
    removeHighlight,
    updateFeature,
    appendFeature,
    removeFeature,
  } = props;

  return (
      <Section
        number="02"
        title="Offer content & schedule"
        description="Complete the customer experience, call to action, timing and important conditions."
      >
        <div className="space-y-8">
          <div className="space-y-5">
            <div>
              <h3 className="text-base font-semibold text-white">Highlights & included features</h3>
              <p className="mt-1 text-sm text-white/35">Add the strongest customer-facing benefits and everything included in the offer.</p>
            </div>
<div className="space-y-8">



          {/* HIGHLIGHTS */}



          <div>

            <div className="mb-3 flex items-center justify-between gap-3">

              <label className={labelClass}>

                Highlights

              </label>



              <button

                type="button"

                onClick={

                  appendHighlight

                }

                className="inline-flex items-center gap-2 rounded-lg border border-[#333] px-3 py-2 text-xs font-medium text-white transition hover:border-[#FFC400]/50 hover:text-[#FFC400]"

              >

                <Plus size={14} />

                Add highlight

              </button>

            </div>



            <div className="space-y-3">



              {highlights.map(

                (

                  value,

                  index,

                ) => (

                  <div

                    key={`highlight-${index}`}

                    className="flex gap-2"

                  >

                    <input

                      value={value}

                      onChange={(

                        event,

                      ) =>

                        updateHighlight(

                          index,

                          event.target

                            .value,

                        )

                      }

                      placeholder="e.g. Premium business website"

                      className={inputClass}

                    />



                    {highlights.length >

                      1 && (

                      <button

                        type="button"

                        onClick={() =>

                          removeHighlight(

                            index,

                          )

                        }

                        className="shrink-0 rounded-xl border border-red-500/20 px-3 text-red-400 transition hover:bg-red-500/10"

                        aria-label="Remove highlight"

                      >

                        <Trash2

                          size={16}

                        />

                      </button>

                    )}

                  </div>

                ),

              )}



            </div>

          </div>



          {/* FEATURES */}



          <div>

            <div className="mb-3 flex items-center justify-between gap-3">

              <label className={labelClass}>

                Included features

              </label>



              <button

                type="button"

                onClick={

                  appendFeature

                }

                className="inline-flex items-center gap-2 rounded-lg border border-[#333] px-3 py-2 text-xs font-medium text-white transition hover:border-[#FFC400]/50 hover:text-[#FFC400]"

              >

                <Plus size={14} />

                Add feature

              </button>

            </div>



            <div className="space-y-3">



              {includedFeatures.map(

                (

                  value,

                  index,

                ) => (

                  <div

                    key={`feature-${index}`}

                    className="flex gap-2"

                  >

                    <input

                      value={value}

                      onChange={(

                        event,

                      ) =>

                        updateFeature(

                          index,

                          event.target

                            .value,

                        )

                      }

                      placeholder="e.g. Mobile responsive development"

                      className={inputClass}

                    />



                    {includedFeatures.length >

                      1 && (

                      <button

                        type="button"

                        onClick={() =>

                          removeFeature(

                            index,

                          )

                        }

                        className="shrink-0 rounded-xl border border-red-500/20 px-3 text-red-400 transition hover:bg-red-500/10"

                        aria-label="Remove feature"

                      >

                        <Trash2

                          size={16}

                        />

                      </button>

                    )}

                  </div>

                ),

              )}



            </div>

          </div>



        </div>
          </div>
          <div className="space-y-5 border-t border-[#252525] pt-8">
            <div>
              <h3 className="text-base font-semibold text-white">Call to action</h3>
              <p className="mt-1 text-sm text-white/35">Tell visitors what action they should take after understanding the offer.</p>
            </div>
<div className="grid gap-5 md:grid-cols-2">



          <div>

            <label className={labelClass}>

              Primary CTA label *

            </label>



            <input

              {...register(

                "ctaLabel",

              )}

              placeholder="Start a Project"

              className={inputClass}

            />



            <FieldError

              message={

                errors.ctaLabel

                  ?.message

              }

            />

          </div>



          <div>

            <label className={labelClass}>

              Primary CTA link *

            </label>



            <input

              {...register(

                "ctaLink",

              )}

              placeholder="/start-a-project"

              className={inputClass}

            />



            <FieldError

              message={

                errors.ctaLink

                  ?.message

              }

            />

          </div>



          <div>

            <label className={labelClass}>

              Secondary CTA label

            </label>



            <input

              {...register(

                "secondaryCtaLabel",

              )}

              placeholder="Talk to us"

              className={inputClass}

            />

          </div>



          <div>

            <label className={labelClass}>

              Secondary CTA link

            </label>



            <input

              {...register(

                "secondaryCtaLink",

              )}

              placeholder="/contact"

              className={inputClass}

            />



            <FieldError

              message={

                errors

                  .secondaryCtaLink

                  ?.message

              }

            />

          </div>



        </div>
          </div>
          <div className="space-y-5 border-t border-[#252525] pt-8">
            <div>
              <h3 className="text-base font-semibold text-white">Schedule</h3>
              <p className="mt-1 text-sm text-white/35">The offer lifecycle is automatic. No cron job or manual status update is required.</p>
            </div>
<div className="grid gap-5 md:grid-cols-2">



          <div>

            <label className={labelClass}>

              Start date & time *

            </label>



            <input

              type="datetime-local"

              {...register(

                "startDate",

              )}

              className={inputClass}

            />



            <p className="mt-2 text-xs text-white/30">

              India time (IST). The offer becomes active automatically when this time arrives.

            </p>



            <FieldError

              message={

                errors.startDate

                  ?.message

              }

            />

          </div>



          <div>

            <label className={labelClass}>

              End date & time *

            </label>



            <input

              type="datetime-local"

              {...register(

                "endDate",

              )}

              className={inputClass}

            />



            <p className="mt-2 text-xs text-white/30">

              After this time the offer automatically becomes expired.

            </p>



            <FieldError

              message={

                errors.endDate

                  ?.message

              }

            />

          </div>



        </div>
          </div>
          <div className="space-y-5 border-t border-[#252525] pt-8">
            <div>
              <h3 className="text-base font-semibold text-white">Terms & conditions</h3>
              <p className="mt-1 text-sm text-white/35">Add limitations, eligibility rules, exclusions or important offer conditions.</p>
            </div>
<textarea

          {...register(

            "termsAndConditions",

          )}

          rows={8}

          placeholder="Example: Offer valid for new website projects only. Domain and third-party costs are separate..."

          className={textareaClass}

        />



        <FieldError

          message={

            errors

              .termsAndConditions

              ?.message

          }

        />
          </div>
        </div>
      </Section>
  );
}
