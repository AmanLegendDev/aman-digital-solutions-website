"use client";

import type { z } from "zod";
import { offerSchema } from "@/schemas/offer.schema";

export type FormValues = z.input<typeof offerSchema>;

export type ImageValue = {
  url: string;
  publicId?: string;
  alt?: string;
};