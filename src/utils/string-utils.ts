export const capitalise = (string: string | null | undefined): string => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};
