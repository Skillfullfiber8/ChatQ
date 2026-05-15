export type ReviewItem = {

  id: string;

  customer: string;

  customerMessage: string;

  suggestedReply: string;

  type: string;

  status:
    | "pending"
    | "approved"
    | "rejected";

  createdAt: Date;
};

const reviewQueue:
  ReviewItem[] = [];

export const addReviewItem = (
  item: ReviewItem
) => {

  reviewQueue.unshift(item);
};

export const getReviewQueue =
  () => {

    return reviewQueue.filter(
      item =>
        item.status ===
        "pending"
    );
};

export const approveReviewItem =
  (id: string) => {

    const item =
      reviewQueue.find(
        review =>
          review.id === id
      );

    if (!item) {
      return null;
    }

    item.status =
      "approved";

    return item;
};

export const rejectReviewItem =
  (id: string) => {

    const item =
      reviewQueue.find(
        review =>
          review.id === id
      );

    if (!item) {
      return null;
    }

    item.status =
      "rejected";

    return item;
};