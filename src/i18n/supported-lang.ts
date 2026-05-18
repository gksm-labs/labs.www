export const supportedLang = ["sk", "en"] as const;
export type SupportedLang = (typeof supportedLang)[number];
export const defaultLang = "sk" as SupportedLang;
