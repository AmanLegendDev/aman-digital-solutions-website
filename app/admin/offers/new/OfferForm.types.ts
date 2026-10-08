"use client";

import type { z } from "zod";
import { offerSchema } from "@/schemas/offer.schema";

/* =========================================================
   FORM VALUES
========================================================= */

export type FormValues =
  z.input<typeof offerSchema>;

/* =========================================================
   IMAGE VALUE
========================================================= */

export type ImageValue = {
  url: string;
  publicId?: string;
  alt?: string;
};