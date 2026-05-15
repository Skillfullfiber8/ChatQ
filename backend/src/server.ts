import "dotenv/config";

import express
from "express";

import cors
from "cors";

import reviewRoutes
from "./modules/reviews/review.routes";

import dashboardRoutes
from "./modules/dashboard/dashboard.routes";

import statusRoutes
from "./routes/status.routes";

import {

  initializeWhatsapp,

} from "./modules/whatsapp/client";

import {

  registerWhatsappEvents,

} from "./modules/whatsapp/events";

const app =
  express();

// CORS
app.use(

  cors({

    origin: "*",

  })
);

// BODY PARSER
app.use(
  express.json()
);

// ROUTES
app.use(
  "/reviews",
  reviewRoutes
);

app.use(
  "/dashboard",
  dashboardRoutes
);

app.use(
  "/status",
  statusRoutes
);

// PORT
const PORT =
  process.env.PORT || 3000;

// START SERVER
app.listen(

  PORT,

  () => {

    console.log(
      `[INFO] Server running on port ${PORT}`
    );
  }
);

// INITIALIZE WHATSAPP
const startWhatsapp =
  async () => {

    try {

      console.log(
        "[INFO] Initializing WhatsApp"
      );

      await initializeWhatsapp();

      console.log(
        "[INFO] Registering WhatsApp Events"
      );

      registerWhatsappEvents();

    } catch (error) {

      console.log(
        "[ERROR] Failed to Initialize WhatsApp"
      );

      console.log(error);
    }
  };

startWhatsapp();