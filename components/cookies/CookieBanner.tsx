"use client";

import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";

type CookieBannerProps = {
  message: string;
};

const COOKIE_CONSENT_KEY = "ads-cookie-notice";

export default function CookieBanner({
  message,
}: CookieBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = window.localStorage.getItem(
        COOKIE_CONSENT_KEY
      );

      if (!consent) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const dismissBanner = () => {
    try {
      window.localStorage.setItem(
        COOKIE_CONSENT_KEY,
        "dismissed"
      );
    } catch {
      // Ignore localStorage failures.
    }

    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[9999] px-4 pb-4 sm:px-6">
      <div className="mx-auto flex max-w-5xl items-center gap-4 rounded-2xl border border-white/10 bg-[#07111B]/95 p-4 shadow-[0_-20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-5">
        {/* Icon */}
        <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#FFD400]/15 bg-[#FFD400]/[0.06] sm:flex">
          <Cookie
            size={20}
            strokeWidth={1.7}
            className="text-[#FFD400]"
          />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <p className="mb-1 text-sm font-semibold text-white">
            We use cookies
          </p>

          <p className="text-xs leading-5 text-white/50 sm:text-sm">
            {message}
          </p>
        </div>

        {/* Action */}
        <button
          type="button"
          onClick={dismissBanner}
          className="shrink-0 rounded-full bg-[#FFD400] px-4 py-2.5 text-xs font-semibold text-black transition-all duration-200 hover:bg-[#ffe04d] hover:shadow-[0_0_25px_rgba(255,212,0,0.15)] sm:px-5 sm:text-sm"
        >
          Got it
        </button>

        {/* Close */}
        <button
          type="button"
          onClick={dismissBanner}
          aria-label="Close cookie notice"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/35 transition-colors hover:bg-white/5 hover:text-white"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}