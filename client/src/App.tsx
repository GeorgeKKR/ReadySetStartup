import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "./lib/queryClient";
import { AnimatePresence } from "framer-motion";
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
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

function Router() {
  const [location] = useLocation();
  
  // Handle GitHub Pages base path
  useEffect(() => {
    // If we're on GitHub Pages and the URL doesn't have the base path
    const basePath = "/ReadySetStartup";
    const currentPath = window.location.pathname;
    
    // If we're on the 404 page at GitHub Pages root
    if (currentPath === "/404.html" || currentPath === "/ReadySetStartup/404.html") {
      window.location.href = `${basePath}/`;
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
