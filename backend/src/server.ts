import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";

import reviewRoutes
from "./modules/reviews/review.routes";

import {
  whatsappClient,
} from "./modules/whatsapp/client";

import {
  registerWhatsappEvents,
} from "./modules/whatsapp/events";

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/reviews",
  reviewRoutes
);

const PORT =
  process.env.PORT || 3000;

app.listen(
  PORT,

  () => {

    console.log(
      `[INFO] Server running on port ${PORT}`
    );
  }
);

// REGISTER EVENTS
registerWhatsappEvents();

// INITIALIZE CLIENT
whatsappClient.initialize();