import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to get the base path for GitHub Pages
export function getBasePath() {
  // Check if we're in development or production
  if (import.meta.env.DEV) {
    return '';
  }
  
  // In production (GitHub Pages), add the base path
  return '/ReadySetStartup';
}
