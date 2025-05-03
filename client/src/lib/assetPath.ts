import { BASE_URL } from '../App';

/**
 * Helper function for asset paths
 * 
 * @param path The relative path to the asset
 * @returns The complete path to the asset
 */
export function getAssetPath(path: string): string {
  // If the path already starts with http or //, it's an absolute URL
  if (path.startsWith('http') || path.startsWith('//')) {
    return path;
  }
  
  // Remove any "/ReadySetStartup" prefix if present
  const cleanPath = path.startsWith('/ReadySetStartup/')
    ? path.replace(/^\/ReadySetStartup\//, '/')
    : path;
  
  // Make sure the path starts with a slash
  const finalPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  
  // For assets, use the base path which is now '/'
  return finalPath;
} 