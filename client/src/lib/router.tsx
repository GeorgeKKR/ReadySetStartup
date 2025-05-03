import React, { useState, useEffect, ReactNode } from 'react';

interface RouterProps {
  children: ReactNode;
}

interface RouteProps {
  path: string;
  children: ReactNode;
}

export const RouterContext = React.createContext({
  location: '/',
  navigate: (to: string) => {}
});

// Router component that manages History API-based routing
export const Router: React.FC<RouterProps> = ({ children }) => {
  // Get current path without query parameters
  const getPath = () => {
    return window.location.pathname || '/';
  };

  const [location, setLocation] = useState<string>(getPath());

  // Update location when history state changes
  useEffect(() => {
    const handlePopState = () => {
      setLocation(getPath());
    };

    // Set initial path
    if (getPath() === '/') {
      // Only push state if we're at the root to avoid extra history entries
      window.history.replaceState({}, '', '/');
    }
    
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Navigate function
  const navigate = (to: string) => {
    // Ensure path starts with a slash
    const path = to.startsWith('/') ? to : `/${to}`;
    
    // Use History API to navigate without page reload
    window.history.pushState({}, '', path);
    
    // Update the location state
    setLocation(path);
  };

  return (
    <RouterContext.Provider value={{ location, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

// Route component that renders when path matches
export const Route: React.FC<RouteProps> = ({ path, children }) => {
  return (
    <RouterContext.Consumer>
      {({ location }) => {
        // Exact path match
        if (path === location) {
          return <>{children}</>;
        }
        // Path with params like /page/:id
        if (path.includes(':')) {
          const pathParts = path.split('/');
          const locationParts = location.split('/');
          
          if (pathParts.length !== locationParts.length) {
            return null;
          }
          
          for (let i = 0; i < pathParts.length; i++) {
            if (pathParts[i].startsWith(':')) continue;
            if (pathParts[i] !== locationParts[i]) return null;
          }
          
          return <>{children}</>;
        }
        
        return null;
      }}
    </RouterContext.Consumer>
  );
};

// Switch component to render only the first matching route
export const Switch: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <RouterContext.Consumer>
      {({ location }) => {
        let match: React.ReactElement | null = null;
        
        React.Children.forEach(children, (child) => {
          if (match) return;
          if (!React.isValidElement(child)) return;
          
          const path = child.props.path;
          
          // Exact path match
          if (path === location) {
            match = child;
            return;
          }
          
          // Path with params like /page/:id
          if (path && path.includes(':')) {
            const pathParts = path.split('/');
            const locationParts = location.split('/');
            
            if (pathParts.length !== locationParts.length) {
              return;
            }
            
            let matches = true;
            for (let i = 0; i < pathParts.length; i++) {
              if (pathParts[i].startsWith(':')) continue;
              if (pathParts[i] !== locationParts[i]) {
                matches = false;
                break;
              }
            }
            
            if (matches) {
              match = child;
            }
          }
          
          // Default route (no path)
          if (!path && !match) {
            match = child;
          }
        });
        
        return match;
      }}
    </RouterContext.Consumer>
  );
};

// Link component for navigation
export const Link: React.FC<{ href: string; className?: string; children: ReactNode; onClick?: () => void }> = ({ 
  href, 
  className, 
  children,
  onClick
}) => {
  return (
    <RouterContext.Consumer>
      {({ navigate }) => {
        // Ensure path starts with a slash
        const path = href.startsWith('/') ? href : `/${href}`;
        
        return (
          <a
            href={path}
            className={className}
            onClick={(e) => {
              e.preventDefault();
              navigate(href);
              if (onClick) onClick();
            }}
          >
            {children}
          </a>
        );
      }}
    </RouterContext.Consumer>
  );
};

// Hook to access router context
export const useRouter = () => {
  return React.useContext(RouterContext);
}; 