import { Router }
from "express";

import {

  getDashboardStats,

  getPendingReviews,

} from "./dashboard.controller";

const router =
  Router();

router.get(

  "/stats",

  getDashboardStats
);

router.get(

  "/reviews",

  getPendingReviews
);

export default router;