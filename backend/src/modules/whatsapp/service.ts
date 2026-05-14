import { Message } from "whatsapp-web.js";

import { generateAIResponse } from "../ai/ai.service";

import { whatsappClient } from "./client";

import { logger } from "../../utils/logger";

import {
  clearConversation,
} from "../conversations/conversation.store";

const TEST_NUMBER = "919786210101@c.us";

export const handleIncomingMessage = async (
  msg: Message
) => {
  try {
    // Ignore empty messages
    if (!msg.body) {
      return;
    }

    // Ignore group chats
    if (msg.from.includes("@g.us")) {
      return;
    }

    // Only allow your number
    if (msg.from !== TEST_NUMBER) {
      return;
    }

    // Ignore bot's own outgoing replies
    // but allow your /ai messages
    if (
      msg.fromMe &&
      !msg.body.startsWith("/ai")
    ) {
      return;
    }

    // Reset memory command
    if (msg.body === "/reset") {
      clearConversation(msg.from);

      await whatsappClient.sendMessage(
        msg.from,
        "Conversation memory cleared ✅"
      );

      return;
    }

    // Require /ai command
    if (!msg.body.startsWith("/ai")) {
      return;
    }

    // Clean message
    const cleanMessage = msg.body
      .replace("/ai", "")
      .trim();

    logger.info(
      `Incoming Message: ${cleanMessage}`
    );

    // Typing indicator
    const chat = await msg.getChat();

    await chat.sendStateTyping();

    // Generate AI reply
    const aiReply = await generateAIResponse(
      msg.from,
      cleanMessage
    );

    // Send message
    await whatsappClient.sendMessage(
      msg.from,
      aiReply
    );

    logger.info(
      `AI Reply Sent To: ${msg.from}`
    );
  } catch (error) {
    logger.error(
      "Message Handling Error:",
      error
    );
  }
};