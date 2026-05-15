import { openrouter } from "./provider";

import {
  BUSINESS_INFO,
  PRODUCTS,
  PAYMENT_INFO,
  SHIPPING_INFO,
  AMAZON_INFO,
} from "../business/business.data";

const MODELS = [

  "openai/gpt-oss-120b:free",

  "google/gemma-4-31b-it:free",

  "google/gemma-4-26b-a4b-it:free",
  
];

// Retrieve relevant product chunks
const retrieveContext = (
  message: string
) => {

  const lower =
    message.toLowerCase();

  let matchedProducts =
    PRODUCTS.filter(product =>

      product.keywords.some(
        keyword =>
          lower.includes(keyword)
      )
    );

  // If asking general product details
  if (
    lower.includes("products") ||
    lower.includes("details") ||
    lower.includes("what do you sell")
  ) {

    matchedProducts =
      PRODUCTS;
  }

  const productText =
    matchedProducts
      .map(p => p.content)
      .join("\n\n---\n\n");

  return `

${BUSINESS_INFO}

${productText}

${PAYMENT_INFO}

${SHIPPING_INFO}

${AMAZON_INFO}

`;
};

export const generateAIResponse =
  async (
    message: string
  ) => {

    const context =
      retrieveContext(message);

    for (const model of MODELS) {

      try {

        console.log(
          `[INFO] Trying model: ${model}`
        );

        const completion =
          await openrouter.chat.completions.create({

            model,

            messages: [

              {
                role: "system",

                content: `
You are Lifessenz customer support.

STRICT RULES:
- ONLY answer using provided context
- NEVER invent products
- NEVER invent supplements
- NEVER invent pricing
- NEVER invent courier charges
- NEVER make medical cure claims
- If information is unavailable, say:
  "Our support team will assist you shortly."
- Keep replies concise and professional
                `,
              },

              {
                role: "user",

                content: `
BUSINESS CONTEXT:

${context}

CUSTOMER MESSAGE:
${message}

Answer ONLY using the business context.
                `,
              },

            ],

          });

        const reply =
          completion
            .choices?.[0]
            ?.message?.content;

        if (reply) {

          console.log(
            `[SUCCESS] Model Success: ${model}`
          );

          return reply;
        }

      } catch (error) {

        console.log(
          `[ERROR] Model Failed: ${model}`
        );

      }

    }

    return (
      "Sorry, our support team will assist you shortly."
    );
};