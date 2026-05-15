import { Router }
from "express";

import {

  getReviews,

  approveReview,

  rejectReview,

} from "./review.controller";

const router =
  Router();

router.get(
  "/",
  getReviews
);

router.post(
  "/:id/approve",
  approveReview
);

router.post(
  "/:id/reject",
  rejectReview
);

export default router;