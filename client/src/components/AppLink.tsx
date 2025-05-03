import { Link } from '@/lib/router';
import { ReactNode } from 'react';

/**
 * Props for the AppLink component
 */
interface AppLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * A wrapper around our Link component for routing
 */
export function AppLink({ href, children, className, onClick }: AppLinkProps) {
  // Make sure the href starts with a slash for internal links
  const formattedHref = href.startsWith('/') ? href : `/${href}`;
  
  // If it's an external link (starts with http or https), use a regular anchor tag
  if (href.startsWith('http://') || href.startsWith('https://')) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  
  // Otherwise, use the Link component that works with our hash router
  return (
    <Link href={formattedHref} className={className} onClick={onClick}>
      {children}
    </Link>
  );
} 