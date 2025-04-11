import React from 'react';
import { Link } from 'wouter';
import { getBasePath } from '@/lib/utils';

interface AppLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * A wrapper around wouter's Link component that handles GitHub Pages base path
 */
const AppLink: React.FC<AppLinkProps> = ({ href, children, className, onClick }) => {
  // Get the base path for GitHub Pages
  const basePath = getBasePath();
  
  // If the href is a relative path (starts with /) and not the home path,
  // we need to adjust the path for GitHub Pages
  const adjustedHref = href.startsWith('/') ? href : `/${href}`;
  
  return (
    <Link 
      href={adjustedHref}
      className={className} 
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default AppLink; 