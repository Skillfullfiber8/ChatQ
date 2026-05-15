import { prisma }
from "../../lib/prisma";

// ADD REVIEW
export const addReviewItem =
  async (
    item: {
      customer: string;
      customerMessage: string;
      suggestedReply: string;
      type: string;
      status:
        | "pending"
        | "approved"
        | "rejected";
    }
  ) => {

    return prisma.review.create({

      data: {

        customer:
          item.customer,

        customerMessage:
          item.customerMessage,

        suggestedReply:
          item.suggestedReply,

        type:
          item.type,

        status:
          item.status,

      },

    });
};

// GET PENDING REVIEWS
export const getReviewQueue =
  async () => {

    return prisma.review.findMany({

      where: {
        status:
          "pending",
      },

      orderBy: {
        createdAt:
          "desc",
      },

    });
};

// APPROVE REVIEW
export const approveReviewItem =
  async (
    id: string
  ) => {

    return prisma.review.update({

      where: { id },

      data: {
        status:
          "approved",
      },

    });
};

// REJECT REVIEW
export const rejectReviewItem =
  async (
    id: string
  ) => {

    return prisma.review.update({

      where: { id },

      data: {
        status:
          "rejected",
      },

    });
};