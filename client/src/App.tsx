import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "./lib/queryClient";
import { AnimatePresence } from "framer-motion";
import { Router, Switch, Route } from "./lib/router";
import { useEffect } from "react";

import Home from "@/pages/Home";
import Seasons from "@/pages/Seasons";
import Cast from "@/pages/Cast";
import Judges from "@/pages/Judges";
import Mentors from "@/pages/Mentors";
import Clips from "@/pages/Clips";
import Resources from "@/pages/Resources";
import Apply from "@/pages/Apply";
import NotFound from "@/pages/not-found";
import ImageTest from "@/pages/ImageTest";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

// Get the base URL from environment for asset paths
// This will be used to prefix asset URLs
export const BASE_URL = import.meta.env.BASE_URL || '/';

function AppRouter() {
  // Handle redirects from GitHub Pages 404.html
  useEffect(() => {
    // Check if we were redirected with a path parameter
    const urlParams = new URLSearchParams(window.location.search);
    const redirectPath = urlParams.get('path');
    
    if (redirectPath) {
      // Remove the path parameter from the URL
      urlParams.delete('path');
      const newUrl = window.location.pathname + (urlParams.toString() ? `?${urlParams.toString()}` : '');
      
      // Replace the current URL without the path parameter
      window.history.replaceState(null, '', newUrl);
      
      // Push the actual path to history
      window.history.pushState(null, '', redirectPath);
    }
  }, []);
  
  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <Switch>
          <Route path="/">
            <PageTransition>
              <Home />
            </PageTransition>
          </Route>
          <Route path="/seasons">
            <PageTransition>
              <Seasons />
            </PageTransition>
          </Route>
          <Route path="/cast">
            <PageTransition>
              <Cast />
            </PageTransition>
          </Route>
          <Route path="/judges">
            <PageTransition>
              <Judges />
            </PageTransition>
          </Route>
          <Route path="/mentors">
            <PageTransition>
              <Mentors />
            </PageTransition>
          </Route>
          <Route path="/clips">
            <PageTransition>
              <Clips />
            </PageTransition>
          </Route>
          <Route path="/resources">
            <PageTransition>
              <Resources />
            </PageTransition>
          </Route>
          <Route path="/apply">
            <PageTransition>
              <Apply />
            </PageTransition>
          </Route>
          <Route path="/image-test">
            <PageTransition>
              <ImageTest />
            </PageTransition>
          </Route>
          <Route path="*">
            <PageTransition>
              <NotFound />
            </PageTransition>
          </Route>
        </Switch>
      </AnimatePresence>
      <Footer />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppRouter />
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
