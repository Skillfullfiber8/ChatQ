import { Message }
from "whatsapp-web.js";

import {
  generateAIResponse,
} from "../ai/ai.service";

import {
  whatsappClient,
} from "./client";

import {
  addReviewItem,
} from "../reviews/review.store";

// REVIEW DETECTION
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

      // SETTINGS
      const requirePrefix =
        process.env
          .REQUIRE_AI_PREFIX ===
        "true";

      const allowOnlyTestNumber =
        process.env
          .ALLOW_ONLY_TEST_NUMBER ===
        "true";

      const testNumber =
        process.env
          .TEST_NUMBER;

      // ONLY TEST NUMBER
      if (
        allowOnlyTestNumber &&
        msg.from !== testNumber
      ) {

        console.log(
          "[INFO] Ignored non-test number"
        );

        return;
      }

      // REQUIRE /ai
      if (
        requirePrefix &&
        !msg.body.startsWith("/ai")
      ) {

        return;
      }

      // CLEAN MESSAGE
      const cleanMessage =
        requirePrefix

          ? msg.body
              .replace("/ai", "")
              .trim()

          : msg.body.trim();

      console.log(
        `[INFO] Incoming Message: ${cleanMessage}`
      );

      // GENERATE AI
      const aiReply =
        await generateAIResponse(
          cleanMessage
        );

      console.log(
        "[DEBUG] AI Reply Generated"
      );

      // REVIEW FLOW
      if (
        shouldReview(
          cleanMessage
        )
      ) {

        await addReviewItem({

          customer:
            msg.from,

          customerMessage:
            cleanMessage,

          suggestedReply:
            aiReply,

          type:
            "pricing",

          status:
            "pending",

        });

        console.log(
          "[DEBUG] Review item added"
        );

        // DO NOT SEND CUSTOMER MESSAGE
        return;
      }

      // SEND DIRECT AI REPLY
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