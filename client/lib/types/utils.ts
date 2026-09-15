// lib/types/utils.ts
export const isValidUrl = (url?: string | null): boolean => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};