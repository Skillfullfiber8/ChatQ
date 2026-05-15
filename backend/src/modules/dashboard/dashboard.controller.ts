import {

  Request,

  Response,

} from "express";

import {
  getReviewQueue,
} from "../reviews/review.store";

// DASHBOARD STATS
export const getDashboardStats =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const reviews =
        await getReviewQueue();

      res.json({

        pendingReviews:
          reviews.length,

        totalMessages:
          120,

        aiResolved:
          87,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Failed to fetch dashboard stats",

      });
    }
};

// GET PENDING REVIEWS
export const getPendingReviews =
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