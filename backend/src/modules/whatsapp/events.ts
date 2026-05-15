import { whatsappClient }
from "./client";

import {
  handleIncomingMessage,
} from "./service";

export const registerWhatsappEvents =
  () => {

    console.log(
      "[INFO] Registering WhatsApp Events"
    );

    whatsappClient.on(

      "message_create",

      async (msg) => {

        console.log(
          "[EVENT] Message Event Triggered"
        );

        console.log(
          "FROM ME:",
          msg.fromMe
        );

        console.log(
          "BODY:",
          msg.body
        );

        // Ignore bot replies ONLY
        if (
          msg.fromMe &&
          !msg.body.startsWith("/ai")
        ) {

          console.log(
            "[INFO] Ignoring bot reply"
          );

          return;
        }

        await handleIncomingMessage(
          msg
        );
      }
    );
};