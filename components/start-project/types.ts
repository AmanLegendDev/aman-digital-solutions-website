import type { ProjectRequestInput } from "@/schemas/projectRequest.schema";

export type ServiceOption = {
  _id: string;
  title: string;
  shortDescription: string;
};

export type FormData = Omit<
  ProjectRequestInput,
  "privacyConsent"
> & {
  privacyConsent: boolean;
};

export type FormErrors = Record<string, string>;

export type FormStep = 1 | 2 | 3 | 4;

export type UpdateForm = <K extends keyof FormData>(
  key: K,
  value: FormData[K],
) => void;

export type ToggleArray = (
  key: "requiredPages" | "requiredFeatures",
  value: string,
) => void;