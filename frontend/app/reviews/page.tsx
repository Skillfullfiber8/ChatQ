"use client";

import {
  useEffect,
  useState,
} from "react";

import { api }
from "@/lib/api";

type Review = {

  id: string;

  customer: string;

  customerMessage: string;

  suggestedReply: string;

  type: string;
};

export default function ReviewsPage() {

  const [reviews, setReviews] =
    useState<Review[]>([]);

  const [editedReplies,
    setEditedReplies] =
      useState<
        Record<string, string>
      >({});

  const fetchReviews =
    async () => {

      try {

        const response =
          await api.get(
            "/reviews"
          );

        setReviews(
          response.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchReviews();

    const interval =
      setInterval(() => {

        fetchReviews();

      }, 3000);

    return () =>
      clearInterval(interval);

  }, []);

  const approveReview =
    async (
      id: string
    ) => {

      try {

        await api.post(

          `/reviews/${id}/approve`,

          {
            message:
              editedReplies[id],
          }
        );

        setReviews(prev =>
          prev.filter(
            review =>
              review.id !== id
          )
        );

      } catch (error) {

        console.log(error);
      }
    };

  const rejectReview =
    async (
      id: string
    ) => {

      try {

        await api.post(
          `/reviews/${id}/reject`
        );

        setReviews(prev =>
          prev.filter(
            review =>
              review.id !== id
          )
        );

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <main
      className="
        min-h-screen
        bg-[#0f1117]
        text-white
        p-8
      "
    >

      <div
        className="
          max-w-5xl
          mx-auto
        "
      >

        <div
          className="
            flex
            justify-between
            items-center
            mb-10
          "
        >

          <div>

            <h1
              className="
                text-4xl
                font-bold
              "
            >
              Review Queue
            </h1>

            <p
              className="
                text-gray-400
                mt-2
              "
            >
              AI generated replies awaiting approval
            </p>

          </div>

          <div
            className="
              bg-yellow-500/20
              text-yellow-400
              px-4
              py-2
              rounded-xl
            "
          >
            {reviews.length} Pending
          </div>

        </div>

        {reviews.length === 0 && (

          <div
            className="
              bg-[#1a1d29]
              rounded-2xl
              p-10
              text-center
            "
          >

            <h2
              className="
                text-2xl
                font-bold
                mb-3
              "
            >
              No Pending Reviews
            </h2>

            <p className="text-gray-400">
              New review requests
              will appear here automatically.
            </p>

          </div>

        )}

        <div className="space-y-6">

          {reviews.map((review) => (

            <div
              key={review.id}

              className="
                bg-[#1a1d29]
                rounded-2xl
                p-6
              "
            >

              {/* Header */}

              <div
                className="
                  flex
                  justify-between
                  items-center
                  mb-5
                "
              >

                <div>

                  <p
                    className="
                      text-sm
                      text-gray-400
                    "
                  >
                    Customer
                  </p>

                  <h2
                    className="
                      text-lg
                      font-bold
                    "
                  >
                    {review.customer}
                  </h2>

                </div>

                <div
                  className="
                    bg-yellow-500/20
                    text-yellow-400
                    px-3
                    py-1
                    rounded-lg
                    text-sm
                  "
                >
                  {review.type}
                </div>

              </div>

              {/* Customer Message */}

              <div className="mb-5">

                <p
                  className="
                    text-gray-400
                    mb-2
                  "
                >
                  Customer Message
                </p>

                <div
                  className="
                    bg-[#11141f]
                    rounded-xl
                    p-4
                  "
                >
                  {review.customerMessage}
                </div>

              </div>

              {/* Editable Reply */}

              <div className="mb-6">

                <p
                  className="
                    text-gray-400
                    mb-2
                  "
                >
                  AI Suggested Reply
                </p>

                <textarea

                  value={
                    editedReplies[
                      review.id
                    ] ??
                    review.suggestedReply
                  }

                  onChange={(e) =>

                    setEditedReplies(
                      prev => ({

                        ...prev,

                        [review.id]:
                          e.target.value,

                      })
                    )
                  }

                  className="
                    w-full
                    bg-[#11141f]
                    rounded-xl
                    p-4
                    min-h-[160px]
                    outline-none
                    resize-none
                  "
                />

              </div>

              {/* Buttons */}

              <div className="flex gap-4">

                <button

                  onClick={() =>
                    approveReview(
                      review.id
                    )
                  }

                  className="
                    bg-green-600
                    hover:bg-green-700
                    px-5
                    py-3
                    rounded-xl
                    font-semibold
                  "
                >
                  Approve & Send
                </button>

                <button

                  onClick={() =>
                    rejectReview(
                      review.id
                    )
                  }

                  className="
                    bg-red-600
                    hover:bg-red-700
                    px-5
                    py-3
                    rounded-xl
                    font-semibold
                  "
                >
                  Reject
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}