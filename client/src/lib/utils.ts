import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to get the base path (empty for custom domain)
export function getBasePath() {
  // Always return empty string since we're using a custom domain
  return '';
}
