import qrcode from "qrcode-terminal";

import puppeteer
from "puppeteer";

import {

  Client,

  LocalAuth,

} from "whatsapp-web.js";

// Latest QR
export let latestQr:
  string | null = null;

// WhatsApp Status
export let isWhatsappReady =
  false;

// WhatsApp Client
export const whatsappClient =
  new Client({

    authStrategy:
      new LocalAuth(),

    puppeteer: {

      browserWSEndpoint:
        undefined,

      executablePath:
        puppeteer.executablePath(),

      headless: true,

      args: [

        "--no-sandbox",

        "--disable-setuid-sandbox",

        "--disable-dev-shm-usage",

        "--disable-gpu",

      ],

    },

  });

// QR EVENT
whatsappClient.on(

  "qr",

  (qr) => {

    latestQr = qr;

    isWhatsappReady = false;

    console.log(
      "[INFO] Scan QR Code Below:"
    );

    qrcode.generate(
      qr,
      {
        small: true,
      }
    );
  }
);

// AUTHENTICATED
whatsappClient.on(

  "authenticated",

  () => {

    console.log(
      "[SUCCESS] WhatsApp Authenticated"
    );
  }
);

// READY
whatsappClient.on(

  "ready",

  () => {

    latestQr = null;

    isWhatsappReady = true;

    console.log(
      "[SUCCESS] WhatsApp Client Ready"
    );
  }
);

// AUTH FAILURE
whatsappClient.on(

  "auth_failure",

  (message) => {

    console.log(
      "[ERROR] WhatsApp Auth Failure"
    );

    console.log(message);

    isWhatsappReady = false;
  }
);

// DISCONNECTED
whatsappClient.on(

  "disconnected",

  async (reason) => {

    console.log(
      "[WARNING] WhatsApp Disconnected"
    );

    console.log(reason);

    isWhatsappReady = false;

    latestQr = null;

    try {

      console.log(
        "[INFO] Reinitializing WhatsApp..."
      );

      await whatsappClient.initialize();

    } catch (error) {

      console.log(
        "[ERROR] Failed to Reinitialize WhatsApp"
      );

      console.log(error);
    }
  }
);