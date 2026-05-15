import {
  Request,
  Response,
} from "express";

import {

  approveReviewItem,

  rejectReviewItem,

  getReviewQueue,

} from "./review.store";

import {
  whatsappClient,
} from "../whatsapp/client";

// GET REVIEWS
export const getReviews =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const reviews =
        await getReviewQueue();

      res.json(reviews);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to fetch reviews",
      });
    }
};

// APPROVE REVIEW
export const approveReview =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const id =
        req.params.id as string;

      const {
        message,
      } = req.body;

      const review =
        await approveReviewItem(id);

      if (!review) {

        return res
          .status(404)
          .json({
            message:
              "Review not found",
          });
      }

      await whatsappClient
        .sendMessage(

          review.customer,

          message ||
          review.suggestedReply
        );

      res.json({
        success: true,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to approve review",
      });
    }
};

// REJECT REVIEW
export const rejectReview =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const id =
        req.params.id as string;

      const review =
        await rejectReviewItem(id);

      if (!review) {

        return res
          .status(404)
          .json({
            message:
              "Review not found",
          });
      }

      res.json({
        success: true,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to reject review",
      });
    }
};