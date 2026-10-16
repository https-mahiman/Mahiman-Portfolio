import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { sendContactEmail } from "@/lib/mailer";
import { contactRateLimit } from "@/lib/rate-limit";

// export const runtime = "nodejs";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
  try {
    // Reject unexpectedly large requests.
    const contentLength = Number(request.headers.get("content-length") ?? 0);

    if (contentLength > 20_000) {
      return NextResponse.json(
        { message: "Request is too large." },
        { status: 413 },
      );
    }

    const contentType = request.headers.get("content-type") ?? "";

    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { message: "Content-Type must be application/json." },
        { status: 415 },
      );
    }

    // Rate-limit each visitor before processing the form.
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip =
      forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip");

    if (!ip) {
      return NextResponse.json(
        { message: "Unable to verify your request. Please try again." },
        { status: 503 },
      );
    }

    const { success, limit, remaining, reset } =
      await contactRateLimit.limit(ip);

    if (!success) {
      const retryAfter = Math.max(1, Math.ceil((reset - Date.now()) / 1000));

      return NextResponse.json(
        {
          message:
            "Too many messages submitted. Please try again in a few minutes.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(retryAfter),
            "X-RateLimit-Limit": String(limit),
            "X-RateLimit-Remaining": String(remaining),
          },
        },
      );
    }

    const data = (await request.json()) as ContactPayload;

    // Honeypot: silently accept the submission without sending email.
    // This helps discourage simple bots; it is not complete spam protection.
    if (getText(data.website)) {
      return NextResponse.json({
        message: "Message sent successfully.",
      });
    }

    const name = getText(data.name);
    const email = getText(data.email);
    const subject = getText(data.subject);
    const message = getText(data.message);

    // Validate required fields and lengths on the server.
    if (
      name.length < 2 ||
      name.length > 100 ||
      email.length > 254 ||
      !isValidEmail(email) ||
      subject.length < 2 ||
      subject.length > 150 ||
      message.length < 10 ||
      message.length > 5000
    ) {
      return NextResponse.json(
        { message: "Please check your details and try again." },
        { status: 400 },
      );
    }

    // Verify all required environment variables are configured.
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT ?? 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.CONTACT_TO;
    const from = process.env.CONTACT_FROM || user;

    if (
      !host ||
      !user ||
      !pass ||
      !to ||
      !from ||
      !Number.isInteger(port) ||
      port < 1 ||
      port > 65535
    ) {
      console.error("Contact form SMTP configuration is incomplete.");

      return NextResponse.json(
        { message: "Email service is temporarily unavailable." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });

    await sendContactEmail({
      name,
      email,
      subject,
      message,
    });

    return NextResponse.json({
      message: "Message sent successfully. Thank you for reaching out!",
    });
  } catch (error) {
    console.error(
      "Contact form submission failed:",
      error instanceof Error ? error.message : "Unknown error",
    );

    return NextResponse.json(
      {
        message:
          "Unable to send your message right now. Please try again later.",
      },
      { status: 500 },
    );
  }
}
