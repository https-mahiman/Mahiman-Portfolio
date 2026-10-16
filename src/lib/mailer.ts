import nodemailer from "nodemailer";

type ContactEmailData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function sendContactEmail({
  name,
  email,
  subject,
  message,
}: ContactEmailData): Promise<void> {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM || user;

  if (!host || !user || !pass || !to || !from) {
    throw new Error("SMTP configuration is incomplete.");
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

  await transporter.sendMail({
    from: {
      name: "Mahiman Portfolio",
      address: from,
    },
    to,
    replyTo: {
      name,
      address: email,
    },
    subject: `Portfolio inquiry: ${subject}`,
    text: [
      "New message received from your portfolio.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      "",
      "Message:",
      message,
    ].join("\n"),
  });

  await transporter.close();
}
