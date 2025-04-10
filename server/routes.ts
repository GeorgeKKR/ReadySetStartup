import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertApplicationSchema, insertNewsletterSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Application submission endpoint
  app.post("/api/applications/submit", async (req, res) => {
    try {
      const applicationData = insertApplicationSchema.parse(req.body);
      const application = await storage.createApplication(applicationData);
      res.status(201).json(application);
    } catch (error) {
      res.status(400).json({ error: "Invalid application data" });
    }
  });

  // Newsletter subscription endpoint
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const newsletterData = insertNewsletterSchema.parse(req.body);
      const subscription = await storage.createNewsletterSubscription(newsletterData);
      res.status(201).json(subscription);
    } catch (error) {
      res.status(400).json({ error: "Invalid email address" });
    }
  });

  // Get application deadline
  app.get("/api/application/deadline", (req, res) => {
    // Mock deadline data - in a real app, this would come from a database
    const deadline = {
      days: 15,
      hours: 8,
      minutes: 45,
      seconds: 22
    };
    res.json(deadline);
  });

  const httpServer = createServer(app);

  return httpServer;
}
