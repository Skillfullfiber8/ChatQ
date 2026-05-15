import qrcode from "qrcode-terminal";

import {
  Client,
  LocalAuth,
} from "whatsapp-web.js";

export const whatsappClient =
  new Client({

    authStrategy:
      new LocalAuth(),

    puppeteer: {

      headless: true,

      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
      ],

    },

  });

whatsappClient.on(
  "qr",

  (qr) => {

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

whatsappClient.on(
  "authenticated",

  () => {

    console.log(
      "[SUCCESS] WhatsApp Authenticated"
    );
  }
);

whatsappClient.on(
  "ready",

  () => {

    console.log(
      "[SUCCESS] WhatsApp Client Ready"
    );
  }
);