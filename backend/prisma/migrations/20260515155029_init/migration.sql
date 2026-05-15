-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "customer" TEXT NOT NULL,
    "customerMessage" TEXT NOT NULL,
    "suggestedReply" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);
