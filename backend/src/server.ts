import app from "./app";
import { config } from "./config";
import { logger } from "./utils/logger";

import { whatsappClient } from "./modules/whatsapp/client";
import { registerWhatsappEvents } from "./modules/whatsapp/events";

const startServer = async () => {
  try {
    registerWhatsappEvents();

    whatsappClient.initialize();

    app.listen(config.port, () => {
      logger.info(
        `Server running on port ${config.port}`
      );
    });
  } catch (error) {
    logger.error("Server Startup Error:", error);
  }
};

startServer();