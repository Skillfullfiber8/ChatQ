import OpenAI from "openai";

export const openRouterClient = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,

  baseURL: "https://openrouter.ai/api/v1",
});