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
  (
    req: Request,
    res: Response
  ) => {

    try {

      const reviews =
        getReviewQueue();

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
        approveReviewItem(id);

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
  (
    req: Request,
    res: Response
  ) => {

    try {

      const id =
        req.params.id as string;

      const review =
        rejectReviewItem(id);

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