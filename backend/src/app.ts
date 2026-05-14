import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/health", (_req, res) => {
  return res.status(200).json({
    success: true,
    message: "ChatQ Backend Running",
  });
});

export default app;