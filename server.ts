import express from "express";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 6;
const rateLimitStore = new Map<string, { count: number; startedAt: number }>();

function sanitizeText(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim();
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function rateLimitKey(req: express.Request) {
  const forwardedFor = req.headers["x-forwarded-for"];
  if (typeof forwardedFor === "string" && forwardedFor.length > 0) {
    return forwardedFor.split(",")[0].trim();
  }

  return req.ip || "unknown";
}

function isRateLimited(req: express.Request) {
  const key = rateLimitKey(req);
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || now - current.startedAt > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(key, { count: 1, startedAt: now });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  current.count += 1;
  rateLimitStore.set(key, current);
  return false;
}

async function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(express.json({ limit: "300kb" }));

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, service: "exordia-web" });
  });

  app.post("/api/booking", async (req, res) => {
    if (isRateLimited(req)) {
      return res.status(429).json({
        error: "Too many submissions in a short time. Please wait a minute and try again.",
      });
    }

    const inquiryId = sanitizeText(req.body.inquiryId);
    const serviceId = sanitizeText(req.body.serviceId);
    const projectTitle = sanitizeText(req.body.projectTitle);
    const projectDescription = sanitizeText(req.body.projectDescription);
    const budget = sanitizeText(req.body.budget);
    const projectDate = sanitizeText(req.body.projectDate);
    const projectLocation = sanitizeText(req.body.projectLocation);
    const timeline = sanitizeText(req.body.timeline);
    const preferredContact = sanitizeText(req.body.preferredContact);
    const referenceLink = sanitizeText(req.body.referenceLink);
    const clientName = sanitizeText(req.body.clientName);
    const companyName = sanitizeText(req.body.companyName);
    const clientEmail = sanitizeText(req.body.clientEmail);
    const clientPhone = sanitizeText(req.body.clientPhone);

    if (
      !serviceId ||
      !projectTitle ||
      !projectDescription ||
      !budget ||
      !clientName ||
      !clientEmail ||
      !clientPhone
    ) {
      return res.status(400).json({
        error:
          "Missing required booking fields. Please complete the service, project, and contact details.",
      });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error:
          "Automatic delivery is not configured on this host yet. Use the built-in WhatsApp or email fallback.",
      });
    }

    try {
      const resend = new Resend(apiKey);
      const { data, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: ["Ex0rdia@outlook.com"],
        subject: `New Booking Inquiry: ${projectTitle}`,
        html: `
          <div style="font-family: sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; border: 1px solid #eee; border-radius: 18px;">
            <h2 style="color: #111; border-bottom: 2px solid #D4AF37; padding-bottom: 12px;">New Booking Inquiry</h2>
            <p><strong>Inquiry ID:</strong> ${escapeHtml(inquiryId || "Pending")}</p>

            <div style="margin-top: 24px;">
              <p><strong>Service:</strong> ${escapeHtml(serviceId)}</p>
              <p><strong>Project Title:</strong> ${escapeHtml(projectTitle)}</p>
              <p><strong>Description:</strong> ${escapeHtml(projectDescription)}</p>
              <p><strong>Desired Investment:</strong> ${escapeHtml(budget)} BHD</p>
              <p><strong>Timeline:</strong> ${escapeHtml(timeline || "Flexible")}</p>
              <p><strong>Target Date:</strong> ${escapeHtml(projectDate || "Flexible")}</p>
              <p><strong>Location:</strong> ${escapeHtml(projectLocation || "Not provided")}</p>
              <p><strong>Preferred Contact:</strong> ${escapeHtml(preferredContact || "Email")}</p>
              <p><strong>Reference Link:</strong> ${escapeHtml(referenceLink || "None")}</p>
            </div>

            <div style="margin-top: 32px; padding: 18px; background-color: #f9f9f9; border-radius: 12px;">
              <h3 style="margin-top: 0;">Client Details</h3>
              <p><strong>Name:</strong> ${escapeHtml(clientName)}</p>
              <p><strong>Company:</strong> ${escapeHtml(companyName || "Not provided")}</p>
              <p><strong>Email:</strong> <a href="mailto:${escapeHtml(clientEmail)}">${escapeHtml(clientEmail)}</a></p>
              <p><strong>Phone:</strong> ${escapeHtml(clientPhone)}</p>
            </div>

            <p style="margin-top: 30px; font-size: 12px; color: #888;">
              This inquiry was sent from the Exordia website.
            </p>
          </div>
        `,
      });

      if (error) {
        return res.status(500).json({ error: `Resend error: ${error.message}` });
      }

      res.json({
        success: true,
        message: "Inquiry sent successfully.",
        inquiryId,
        data,
      });
    } catch (error) {
      res.status(500).json({
        error: `Unexpected server error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    }
  });

  app.post("/api/contact", async (req, res) => {
    if (isRateLimited(req)) {
      return res.status(429).json({
        error: "Too many messages in a short time. Please wait a minute and try again.",
      });
    }

    const name = sanitizeText(req.body.name);
    const email = sanitizeText(req.body.email);
    const message = sanitizeText(req.body.message);

    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Missing required contact fields. Please fill in your name, email, and message.",
      });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error:
          "Automatic delivery is not configured on this host yet. Use the built-in WhatsApp or email fallback.",
      });
    }

    try {
      const resend = new Resend(apiKey);
      const { data, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: ["Ex0rdia@outlook.com"],
        subject: `New Contact Message from ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; border: 1px solid #eee; border-radius: 18px;">
            <h2 style="color: #111; border-bottom: 2px solid #D4AF37; padding-bottom: 12px;">New Contact Message</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 18px; border-radius: 12px;">${escapeHtml(message)}</p>
          </div>
        `,
      });

      if (error) {
        return res.status(500).json({ error: `Resend error: ${error.message}` });
      }

      res.json({ success: true, message: "Message sent successfully.", data });
    } catch (error) {
      res.status(500).json({
        error: `Unexpected server error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer();
