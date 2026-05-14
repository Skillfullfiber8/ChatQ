import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,

  openRouterApiKey: process.env.OPENROUTER_API_KEY || "",

  aiModel:
    process.env.AI_MODEL || "openai/gpt-4o-mini",

  appName: process.env.APP_NAME || "ChatQ",

  appUrl: process.env.APP_URL || "http://localhost:3000",
};