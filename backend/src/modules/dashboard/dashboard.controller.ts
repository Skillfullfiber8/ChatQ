import {
  getReviewQueue,
} from "../reviews/review.store";

export const getDashboardStats = (
  req: Request,
  res: Response
) => {
  const reviews = getReviewQueue();

  res.json({
    pendingReviews: reviews.length,
    totalChats: 120,
    aiResolved: 87,
  });
};

export const getPendingReviews = (
  req: Request,
  res: Response
) => {
  res.json(getReviewQueue());
};