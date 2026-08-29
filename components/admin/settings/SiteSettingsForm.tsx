"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  Clock3,
  Globe2,
  MapPin,
  Megaphone,
  Search,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { siteSettingsSchema } from "@/schemas/site-settings.schema";
import type { z } from "zod";

import { saveSiteSettings } from "@/actions/site-settings.actions";

import CloudinaryImageUploader from "@/components/admin/media/CloudinaryImageUploader";

type FormInput = z.input<typeof siteSettingsSchema>;
type FormOutput = z.output<typeof siteSettingsSchema>;

type ExistingSettings = Partial<FormInput>;

const SITE_URL =
  "https://www.amandigitalsolutions.com";

const inputClass =
  "w-full rounded-xl border border-[#292929] bg-[#0D0D0D] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#FFC400]/60 focus:ring-2 focus:ring-[#FFC400]/10";

const textareaClass =
  "w-full resize-y rounded-xl border border-[#292929] bg-[#0D0D0D] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/25 focus:border-[#FFC400]/60 focus:ring-2 focus:ring-[#FFC400]/10";

const labelClass =
  "mb-2 block text-sm font-medium text-white/80";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DEFAULT_HOURS = DAYS.map(
  (day) => ({
    day,
    isOpen: true,
    openTime: "09:00",
    closeTime: "18:00",
  })
);

function Section({
  icon,
  number,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-[#252525] bg-[#0B0B0B] p-5 sm:p-7">
      <div className="mb-7 flex gap-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFC400]/10 text-[#FFC400]">
          {icon}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#FFC400]/60">
              {number}
            </span>

            <h2 className="text-lg font-semibold">
              {title}
            </h2>
          </div>

          <p className="mt-1 max-w-3xl text-sm leading-5 text-white/40">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

function FieldError({
  message,
}: {
  message?: string;
}) {
  if (!message) return null;

  return (
    <p className="mt-1.5 text-xs text-red-400">
      {message}
    </p>
  );
}

export default function SiteSettingsForm() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [serverError, setServerError] =
    useState("");

  const [saved, setSaved] =
    useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<
  z.input<typeof siteSettingsSchema>,
  unknown,
  z.output<typeof siteSettingsSchema>
>({
  resolver: zodResolver(siteSettingsSchema),

  defaultValues: {
      siteName:
        "Aman Digital Solutions",

      tagline:
        "Professional Digital Solutions",

      description: "",

      contact: {
        email: "",
        phone: "",
        whatsapp: "",
        address: "",
        city: "",
        state: "",
        country: "India",
        postalCode: "",
      },

      socialLinks: {
        instagram: "",
        facebook: "",
        linkedin: "",
        youtube: "",
        twitter: "",
        github: "",
      },

      businessHours:
        DEFAULT_HOURS,

      primaryEmail: "",
      primaryPhone: "",
      whatsappNumber: "",

      footerText: "",
      copyrightText:
        "© Aman Digital Solutions. All rights reserved.",

      googleMapsUrl: "",

      googleAnalyticsId: "",
      googleTagManagerId: "",
      facebookPixelId: "",

      maintenanceMode: false,
      maintenanceTitle:
        "We’re building something better.",
      maintenanceMessage:
        "Our website is currently under development. Please check back soon.",

      showCookieBanner: false,
      cookieMessage:
        "We use cookies to improve your experience.",

      seoTitle:
        "Aman Digital Solutions",

      seoDescription:
        "Professional websites and digital solutions for modern businesses.",

      defaultCanonicalBaseUrl:
        SITE_URL,
    },
  });

  const maintenanceMode =
    watch("maintenanceMode");

  const showCookieBanner =
    watch("showCookieBanner");

  const businessHours =
    watch("businessHours") ??
    DEFAULT_HOURS;

  useEffect(() => {
    let active = true;

    async function loadSettings() {
      try {
        const response = await fetch(
          "/api/admin/settings"
        );

        if (!response.ok) {
          throw new Error(
            "Unable to load settings."
          );
        }

        const data =
          await response.json();

        if (
          active &&
          data.settings
        ) {
          const settings: ExistingSettings =
            data.settings;

          reset({
            siteName:
              settings.siteName ??
              "Aman Digital Solutions",

            tagline:
              settings.tagline ?? "",

            description:
              settings.description ?? "",

            logo: settings.logo,

            favicon:
              settings.favicon,

            contact: {
              email:
                settings.contact?.email ??
                "",
              phone:
                settings.contact?.phone ??
                "",
              whatsapp:
                settings.contact?.whatsapp ??
                "",
              address:
                settings.contact?.address ??
                "",
              city:
                settings.contact?.city ??
                "",
              state:
                settings.contact?.state ??
                "",
              country:
                settings.contact?.country ??
                "India",
              postalCode:
                settings.contact?.postalCode ??
                "",
            },

            socialLinks: {
              instagram:
                settings.socialLinks
                  ?.instagram ?? "",
              facebook:
                settings.socialLinks
                  ?.facebook ?? "",
              linkedin:
                settings.socialLinks
                  ?.linkedin ?? "",
              youtube:
                settings.socialLinks
                  ?.youtube ?? "",
              twitter:
                settings.socialLinks
                  ?.twitter ?? "",
              github:
                settings.socialLinks
                  ?.github ?? "",
            },

            businessHours:
              settings.businessHours?.length
                ? settings.businessHours
                : DEFAULT_HOURS,

            primaryEmail:
              settings.primaryEmail ?? "",

            primaryPhone:
              settings.primaryPhone ?? "",

            whatsappNumber:
              settings.whatsappNumber ?? "",

            defaultOgImage:
              settings.defaultOgImage,

            footerText:
              settings.footerText ?? "",

            copyrightText:
              settings.copyrightText ??
              "© Aman Digital Solutions. All rights reserved.",

            googleMapsUrl:
              settings.googleMapsUrl ?? "",

            googleAnalyticsId:
              settings.googleAnalyticsId ??
              "",

            googleTagManagerId:
              settings.googleTagManagerId ??
              "",

            facebookPixelId:
              settings.facebookPixelId ??
              "",

            maintenanceMode:
              settings.maintenanceMode ??
              false,

            maintenanceTitle:
              settings.maintenanceTitle ??
              "We’re building something better.",

            maintenanceMessage:
              settings.maintenanceMessage ??
              "Our website is currently under development. Please check back soon.",

            showCookieBanner:
              settings.showCookieBanner ??
              false,

            cookieMessage:
              settings.cookieMessage ??
              "We use cookies to improve your experience.",

            seoTitle:
              settings.seoTitle ??
              "Aman Digital Solutions",

            seoDescription:
              settings.seoDescription ??
              "",

            defaultCanonicalBaseUrl:
              settings.defaultCanonicalBaseUrl ??
              SITE_URL,
          });
        }
      } catch (error) {
        console.error(
          "LOAD_SETTINGS_ERROR:",
          error
        );

        if (active) {
          setServerError(
            "Unable to load existing settings."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadSettings();

    return () => {
      active = false;
    };
  }, [reset]);

  const updateBusinessHour = (
    index: number,
    field:
      | "isOpen"
      | "openTime"
      | "closeTime",
    value: string | boolean
  ) => {
    const next = [
      ...businessHours,
    ];

    next[index] = {
      ...next[index],
      [field]: value,
    };

    setValue(
      "businessHours",
      next,
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  };

  const submit = async (
  values: z.output<typeof siteSettingsSchema>
) => {
    setSaving(true);
    setSaved(false);
    setServerError("");

    const result =
      await saveSiteSettings(values);

   if (!result.success) {
  setServerError(
    result.error ?? "Failed to save site settings."
  );

  setSaving(false);
  return;
}

    setSaved(true);
    setSaving(false);

    router.refresh();

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-[#252525] bg-[#0B0B0B] p-10">
        <div className="flex items-center justify-center gap-3 text-sm text-white/40">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/10 border-t-[#FFC400]" />
          Loading site settings...
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-5 pb-10"
    >
      {serverError && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {serverError}
        </div>
      )}

      {saved && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          <Check size={17} />
          Site settings saved successfully.
        </div>
      )}

      {/* BRAND */}
      <Section
        number="01"
        icon={<Globe2 size={18} />}
        title="Website identity"
        description="Control the global brand information used throughout Aman Digital Solutions."
      >
        <div className="grid gap-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>
                Site name *
              </label>

              <input
                {...register("siteName")}
                className={inputClass}
                placeholder="Aman Digital Solutions"
              />

              <FieldError
                message={
                  errors.siteName?.message
                }
              />
            </div>

            <div>
              <label className={labelClass}>
                Tagline
              </label>

              <input
                {...register("tagline")}
                className={inputClass}
                placeholder="Professional Digital Solutions"
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Website description
            </label>

            <textarea
              {...register("description")}
              rows={4}
              className={textareaClass}
              placeholder="Describe Aman Digital Solutions in a clear and professional way."
            />
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <CloudinaryImageUploader
              label="Website logo"
              description="Your main website logo."
              value={watch("logo")}
              onChange={(value) =>
                setValue(
                  "logo",
                  value,
                  {
                    shouldDirty: true,
                    shouldValidate: true,
                  }
                )
              }
            />

            <CloudinaryImageUploader
              label="Favicon"
              description="Small browser/tab icon."
              value={watch("favicon")}
              onChange={(value) =>
                setValue(
                  "favicon",
                  value,
                  {
                    shouldDirty: true,
                    shouldValidate: true,
                  }
                )
              }
            />
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section
        number="02"
        icon={<Smartphone size={18} />}
        title="Contact information"
        description="These details can power the navbar, footer, contact sections and CTA buttons."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              Primary email
            </label>

            <input
              type="email"
              {...register(
                "primaryEmail"
              )}
              className={inputClass}
              placeholder="hello@amandigitalsolutions.com"
            />

            <FieldError
              message={
                errors.primaryEmail
                  ?.message
              }
            />
          </div>

          <div>
            <label className={labelClass}>
              Primary phone
            </label>

            <input
              {...register(
                "primaryPhone"
              )}
              className={inputClass}
              placeholder="+91 00000 00000"
            />
          </div>

          <div>
            <label className={labelClass}>
              WhatsApp number
            </label>

            <input
              {...register(
                "whatsappNumber"
              )}
              className={inputClass}
              placeholder="+91 00000 00000"
            />
          </div>

          <div>
            <label className={labelClass}>
              Contact email
            </label>

            <input
              type="email"
              {...register(
                "contact.email"
              )}
              className={inputClass}
              placeholder="hello@example.com"
            />
          </div>

          <div>
            <label className={labelClass}>
              Contact phone
            </label>

            <input
              {...register(
                "contact.phone"
              )}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Contact WhatsApp
            </label>

            <input
              {...register(
                "contact.whatsapp"
              )}
              className={inputClass}
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>
              Address
            </label>

            <input
              {...register(
                "contact.address"
              )}
              className={inputClass}
              placeholder="Business address"
            />
          </div>

          <div>
            <label className={labelClass}>
              City
            </label>

            <input
              {...register(
                "contact.city"
              )}
              className={inputClass}
              placeholder="Shimla"
            />
          </div>

          <div>
            <label className={labelClass}>
              State
            </label>

            <input
              {...register(
                "contact.state"
              )}
              className={inputClass}
              placeholder="Himachal Pradesh"
            />
          </div>

          <div>
            <label className={labelClass}>
              Country
            </label>

            <input
              {...register(
                "contact.country"
              )}
              className={inputClass}
              placeholder="India"
            />
          </div>

          <div>
            <label className={labelClass}>
              Postal code
            </label>

            <input
              {...register(
                "contact.postalCode"
              )}
              className={inputClass}
            />
          </div>
        </div>
      </Section>

      {/* SOCIAL */}
      <Section
        number="03"
        icon={<Megaphone size={18} />}
        title="Social media"
        description="Add your official social profiles. Empty fields simply won't be rendered on the website."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {(
            [
              [
                "instagram",
                "Instagram",
                "https://instagram.com/...",
              ],
              [
                "facebook",
                "Facebook",
                "https://facebook.com/...",
              ],
              [
                "linkedin",
                "LinkedIn",
                "https://linkedin.com/company/...",
              ],
              [
                "youtube",
                "YouTube",
                "https://youtube.com/@...",
              ],
              [
                "twitter",
                "X / Twitter",
                "https://x.com/...",
              ],
              [
                "github",
                "GitHub",
                "https://github.com/...",
              ],
            ] as const
          ).map(
            ([
              field,
              label,
              placeholder,
            ]) => (
              <div key={field}>
                <label className={labelClass}>
                  {label}
                </label>

                <input
                  {...register(
                    `socialLinks.${field}`
                  )}
                  className={inputClass}
                  placeholder={placeholder}
                />

                <FieldError
                  message={
                    errors.socialLinks?.[
                      field
                    ]?.message
                  }
                />
              </div>
            )
          )}
        </div>
      </Section>

      {/* HOURS */}
      <Section
        number="04"
        icon={<Clock3 size={18} />}
        title="Business hours"
        description="Set the public operating hours shown across your website."
      >
        <div className="overflow-x-auto rounded-xl border border-[#252525]">
          <div className="min-w-[700px]">
            <div className="grid grid-cols-[1.2fr_100px_1fr_1fr] border-b border-[#252525] bg-[#080808] px-4 py-3 text-[11px] uppercase tracking-wider text-white/30">
              <span>Day</span>
              <span>Open</span>
              <span>Opening</span>
              <span>Closing</span>
            </div>

            {businessHours.map(
              (item, index) => (
                <div
                  key={item.day}
                  className="grid grid-cols-[1.2fr_100px_1fr_1fr] items-center border-b border-[#202020] px-4 py-3 last:border-b-0"
                >
                  <span className="text-sm text-white/70">
                    {item.day}
                  </span>

                  <div>
                    <input
                      type="checkbox"
                      checked={
                        item.isOpen
                      }
                      onChange={(event) =>
                        updateBusinessHour(
                          index,
                          "isOpen",
                          event.target
                            .checked
                        )
                      }
                      className="h-4 w-4 accent-[#FFC400]"
                    />
                  </div>

                  <input
                    type="time"
                    value={
                      item.openTime ??
                      ""
                    }
                    disabled={
                      !item.isOpen
                    }
                    onChange={(event) =>
                      updateBusinessHour(
                        index,
                        "openTime",
                        event.target.value
                      )
                    }
                    className={`${inputClass} max-w-[180px] disabled:opacity-20`}
                  />

                  <input
                    type="time"
                    value={
                      item.closeTime ??
                      ""
                    }
                    disabled={
                      !item.isOpen
                    }
                    onChange={(event) =>
                      updateBusinessHour(
                        index,
                        "closeTime",
                        event.target.value
                      )
                    }
                    className={`${inputClass} max-w-[180px] disabled:opacity-20`}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </Section>

      {/* MAP */}
      <Section
        number="05"
        icon={<MapPin size={18} />}
        title="Location & maps"
        description="Add your Google Maps destination so location buttons can be generated globally."
      >
        <div>
          <label className={labelClass}>
            Google Maps URL
          </label>

          <input
            {...register(
              "googleMapsUrl"
            )}
            className={inputClass}
            placeholder="https://maps.google.com/..."
          />

          <FieldError
            message={
              errors.googleMapsUrl
                ?.message
            }
          />
        </div>
      </Section>

      {/* FOOTER */}
      <Section
        number="06"
        icon={<Globe2 size={18} />}
        title="Footer"
        description="Control the global footer copy without touching code."
      >
        <div className="grid gap-5">
          <div>
            <label className={labelClass}>
              Footer text
            </label>

            <textarea
              {...register(
                "footerText"
              )}
              rows={3}
              className={textareaClass}
              placeholder="Building premium digital experiences for modern businesses."
            />
          </div>

          <div>
            <label className={labelClass}>
              Copyright text
            </label>

            <input
              {...register(
                "copyrightText"
              )}
              className={inputClass}
              placeholder="© Aman Digital Solutions. All rights reserved."
            />
          </div>
        </div>
      </Section>

      {/* SEO */}
      <Section
        number="07"
        icon={<Search size={18} />}
        title="Global SEO"
        description="Fallback metadata used when an individual page does not define its own SEO metadata."
      >
        <div className="grid gap-5">
          <div>
            <label className={labelClass}>
              Default SEO title
            </label>

            <input
              {...register("seoTitle")}
              className={inputClass}
              placeholder="Aman Digital Solutions | Professional Web Development"
            />
          </div>

          <div>
            <label className={labelClass}>
              Default SEO description
            </label>

            <textarea
              {...register(
                "seoDescription"
              )}
              rows={4}
              className={textareaClass}
              placeholder="Professional websites and digital solutions for modern businesses."
            />
          </div>

          <div>
            <label className={labelClass}>
              Canonical base URL *
            </label>

            <input
              {...register(
                "defaultCanonicalBaseUrl"
              )}
              className={inputClass}
              placeholder={SITE_URL}
            />

            <p className="mt-1.5 text-xs text-white/30">
              Example: {SITE_URL}
            </p>

            <FieldError
              message={
                errors
                  .defaultCanonicalBaseUrl
                  ?.message
              }
            />
          </div>

          <CloudinaryImageUploader
            label="Default OG image"
            description="Fallback image for social sharing when a page has no custom OG image."
            value={watch(
              "defaultOgImage"
            )}
            onChange={(value) =>
              setValue(
                "defaultOgImage",
                value,
                {
                  shouldDirty: true,
                  shouldValidate: true,
                }
              )
            }
          />
        </div>
      </Section>

      {/* TRACKING */}
      <Section
        number="08"
        icon={<ShieldCheck size={18} />}
        title="Analytics & tracking"
        description="Optional tracking IDs. Leave blank if you are not using the service."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              Google Analytics ID
            </label>

            <input
              {...register(
                "googleAnalyticsId"
              )}
              className={inputClass}
              placeholder="G-XXXXXXXXXX"
            />
          </div>

          <div>
            <label className={labelClass}>
              Google Tag Manager ID
            </label>

            <input
              {...register(
                "googleTagManagerId"
              )}
              className={inputClass}
              placeholder="GTM-XXXXXXX"
            />
          </div>

          <div>
            <label className={labelClass}>
              Facebook Pixel ID
            </label>

            <input
              {...register(
                "facebookPixelId"
              )}
              className={inputClass}
              placeholder="123456789012345"
            />
          </div>
        </div>
      </Section>

      {/* MAINTENANCE */}
      <Section
        number="09"
        icon={<ShieldCheck size={18} />}
        title="Maintenance mode"
        description="Temporarily replace the public website with your maintenance screen while the CMS remains accessible to admins."
      >
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#252525] bg-[#080808] p-4">
          <input
            type="checkbox"
            {...register(
              "maintenanceMode"
            )}
            className="h-4 w-4 accent-[#FFC400]"
          />

          <div>
            <p className="text-sm font-medium">
              Enable maintenance mode
            </p>

            <p className="mt-1 text-xs text-white/30">
              Turn this on only when the public website should show the maintenance page.
            </p>
          </div>
        </label>

        {maintenanceMode && (
          <div className="mt-5 grid gap-5 rounded-xl border border-yellow-500/10 bg-yellow-500/[0.02] p-5">
            <div>
              <label className={labelClass}>
                Maintenance title
              </label>

              <input
                {...register(
                  "maintenanceTitle"
                )}
                className={inputClass}
                placeholder="We’re building something better."
              />
            </div>

            <div>
              <label className={labelClass}>
                Maintenance message
              </label>

              <textarea
                {...register(
                  "maintenanceMessage"
                )}
                rows={4}
                className={textareaClass}
                placeholder="Our website is currently under development. Please check back soon."
              />
            </div>
          </div>
        )}
      </Section>

      {/* COOKIE */}
      <Section
        number="10"
        icon={<ShieldCheck size={18} />}
        title="Cookie banner"
        description="Control the global cookie notice. Keep it disabled if your website does not currently need one."
      >
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#252525] bg-[#080808] p-4">
          <input
            type="checkbox"
            {...register(
              "showCookieBanner"
            )}
            className="h-4 w-4 accent-[#FFC400]"
          />

          <div>
            <p className="text-sm font-medium">
              Show cookie banner
            </p>

            <p className="mt-1 text-xs text-white/30">
              Display the global cookie message.
            </p>
          </div>
        </label>

        {showCookieBanner && (
          <div className="mt-5">
            <label className={labelClass}>
              Cookie message
            </label>

            <textarea
              {...register(
                "cookieMessage"
              )}
              rows={3}
              className={textareaClass}
              placeholder="We use cookies to improve your experience."
            />
          </div>
        )}
      </Section>

      {/* SAVE */}
      <div className="sticky bottom-4 z-20 flex flex-col gap-4 rounded-2xl border border-[#252525] bg-[#0B0B0B]/95 p-4 shadow-2xl backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium">
            Global site configuration
          </p>

          <p className="mt-1 text-xs text-white/30">
            Changes are saved across the website.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() =>
              router.refresh()
            }
            disabled={saving}
            className="rounded-xl border border-[#303030] px-5 py-3 text-sm font-medium text-white/70 transition hover:border-[#555] hover:text-white disabled:opacity-50"
          >
            Reset
          </button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FFC400] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#FFD43B] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                Saving...
              </>
            ) : (
              <>
                <Check size={17} />
                Save Settings
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}