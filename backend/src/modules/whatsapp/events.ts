import { whatsappClient } from "./client";
import { handleIncomingMessage } from "./service";

export const registerWhatsappEvents = () => {
  whatsappClient.on("message_create", async (msg) => {
    console.log("MESSAGE RECEIVED:", msg.body);

    await handleIncomingMessage(msg);
  });
};