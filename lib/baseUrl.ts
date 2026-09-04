export function getBaseUrl() {
  // Client-side: relative path is sufficient
  if (typeof window !== "undefined") return "";

  // Vercel deployment (Production or Preview)
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  // Custom explicit domain if set in Vercel environment variables
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;

  // Local development fallback
  return "http://localhost:3000";
}