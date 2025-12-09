import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./emailTemplate.js";
import { ENV } from "../lib/env.js";

export const sendWelcomeEmail = async (
  email: any,
  name: any,
  clientURL: any
) => {
  const hasEmailConfig = ENV.RESEND_API_KEY && sender.email && sender.name;

  // Skip sending in non-production or when config is missing to avoid Resend test-mode errors.
  if (!hasEmailConfig || ENV.NODE_ENV !== "production") {
    console.log("Welcome email skipped (missing config or non-production)");
    return;
  }

  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Welcome to Chatify!",
    html: createWelcomeEmailTemplate(name, clientURL),
  });

  if (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Failed to send welcome email");
  }

  console.log("Welcome email sent successfully to", data);
};
