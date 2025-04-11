import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "./lib/queryClient";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useHashLocation } from "@/lib/useHashLocation";

import Home from "@/pages/Home";
import Seasons from "@/pages/Seasons";
import Cast from "@/pages/Cast";
import Judges from "@/pages/Judges";
import Mentors from "@/pages/Mentors";
import Clips from "@/pages/Clips";
import Resources from "@/pages/Resources";
import Apply from "@/pages/Apply";
import NotFound from "@/pages/not-found";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

function Router() {
  // Use hash-based routing for GitHub Pages
  const [location] = useHashLocation();
  
  // Handle GitHub Pages base path
  useEffect(() => {
    // Special case for direct access to pages on GitHub
    if (window.location.pathname.includes("/ReadySetStartup/") && 
        window.location.pathname !== "/ReadySetStartup/" && 
        !window.location.hash) {
      // Extract the path after /ReadySetStartup/
      const path = window.location.pathname.replace("/ReadySetStartup/", "");
      if (path && path !== "index.html" && path !== "404.html") {
        // Redirect to hash-based route
        window.location.href = "/ReadySetStartup/#/" + path;
      }
    }
  }, []);
  
  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <Switch location={location} key={location}>
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
          <Route>
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
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
