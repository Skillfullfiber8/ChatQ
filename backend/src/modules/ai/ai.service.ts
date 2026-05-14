import { openRouterClient } from "./provider";

import { businessContext } from "../business/business.data";

import {
  addMessage,
  getConversation,
} from "../conversations/conversation.store";

import { logger } from "../../utils/logger";

const MODELS = [

  "openai/gpt-oss-120b:free",

  "google/gemma-4-31b-it:free",

  "google/gemma-4-26b-a4b-it:free",
  
];

export const generateAIResponse = async (
  userId: string,
  userMessage: string
): Promise<string> => {
  try {
    addMessage(userId, {
      role: "user",
      content: userMessage,
    });

    const history = getConversation(userId);

    for (const model of MODELS) {
      try {
        logger.info(
          `Trying model: ${model}`
        );

        const completion =
          await openRouterClient.chat.completions.create({
            model,

            messages: [
              {
                role: "system",
                content: businessContext,
              },

              ...history,
            ],

            temperature: 0.7,

            max_tokens: 200,
          });

        const aiReply =
          completion.choices[0].message.content;

        if (!aiReply) {
          continue;
        }

        addMessage(userId, {
          role: "assistant",
          content: aiReply,
        });

        logger.success(
          `Model Success: ${model}`
        );

        return aiReply;
      } catch (modelError) {
        logger.warn(
          `Model Failed: ${model}`
        );

        console.error(modelError);
      }
    }

    return "Sorry, all AI services are busy right now.";
  } catch (error) {
    logger.error("AI Error:", error);

    return "Something went wrong.";
  }
};