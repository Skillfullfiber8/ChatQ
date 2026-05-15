import { Message } from "whatsapp-web.js";

import { generateAIResponse }
from "../ai/ai.service";

import { whatsappClient }
from "./client";

import {
  addReviewItem,
} from "../reviews/review.store";

// Detect if message needs human review
const shouldReview =
  (
    message: string
  ) => {

    const lower =
      message.toLowerCase();

    return (

      lower.includes("price") ||

      lower.includes("cost") ||

      lower.includes("courier") ||

      lower.includes("delivery") ||

      lower.includes("order") ||

      lower.includes("buy") ||

      lower.includes("payment") ||

      lower.includes("need") ||

      /\d/.test(lower)

    );
};

export const handleIncomingMessage =
  async (
    msg: Message
  ) => {

    try {


      console.log(
        `MESSAGE RECEIVED: ${msg.body}`
      );

      // Require /ai
      if (
        !msg.body.startsWith("/ai")
      ) {
        return;
      }

      // Remove /ai keyword
      const cleanMessage =
        msg.body
          .replace("/ai", "")
          .trim();

      console.log(
        `[INFO] Incoming Message: ${cleanMessage}`
      );

      // Generate AI response
      const aiReply =
        await generateAIResponse(
          cleanMessage
        );

      console.log(
        "[DEBUG] AI Reply Generated:"
      );

      console.log(aiReply);

      // REVIEW FLOW
      if (
        shouldReview(
          cleanMessage
        )
      ) {

        const reviewItem = {

  id:
    Date.now()
      .toString(),

  customer:
    msg.from,

  customerMessage:
    cleanMessage,

  suggestedReply:
    aiReply,

  type:
    "pricing",

  status:
    "pending" as const,

  createdAt:
    new Date(),

};

        addReviewItem(
          reviewItem
        );

        console.log(
          "[DEBUG] Review item added:"
        );

        console.log(
          reviewItem
        );

        // DO NOT SEND CUSTOMER MESSAGE
        return;
      }

      // Direct AI reply
      await whatsappClient
        .sendMessage(
          msg.from,
          aiReply
        );

      console.log(
        `[INFO] AI Reply Sent To: ${msg.from}`
      );

    } catch (error) {

      console.log(
        "[ERROR] WhatsApp Service Error"
      );

      console.log(error);

    }
};