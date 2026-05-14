import qrcode from "qrcode-terminal";

import {
  Client,
  LocalAuth,
} from "whatsapp-web.js";

import { logger } from "../../utils/logger";

export const whatsappClient = new Client({
  authStrategy: new LocalAuth(),

  puppeteer: {
    headless: true,

    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--disable-gpu",
    ],
  },

  webVersionCache: {
    type: "none",
  },
});

whatsappClient.on("qr", (qr) => {
  logger.info("Scan QR Code Below:");

  qrcode.generate(qr, {
    small: true,
  });
});

whatsappClient.on("ready", () => {
  logger.success("WhatsApp Client Ready");
});

whatsappClient.on("authenticated", () => {
  logger.success("WhatsApp Authenticated");
});

whatsappClient.on("auth_failure", (msg) => {
  logger.error("Auth Failure:", msg);
});

whatsappClient.on("disconnected", (reason) => {
  logger.warn("WhatsApp Disconnected:", reason);
});