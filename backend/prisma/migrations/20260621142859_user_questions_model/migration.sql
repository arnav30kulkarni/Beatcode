-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('SOLVED', 'SOLVED_WITH_HINTS', 'UNSOLVED');

-- CreateEnum
CREATE TYPE "MistakeType" AS ENUM ('CONCEPTUAL', 'EDGE_CASE', 'IMPLEMENTATION', 'CARELESSNESS', 'OPTIMIZATION');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email_id" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3),
    "Password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questions" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "desciption" TEXT NOT NULL,
    "Url" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "topic" TEXT NOT NULL,
    "dateSolved" TIMESTAMP(3) NOT NULL,
    "mistaketype" "MistakeType",
    "difficulty" "Difficulty" NOT NULL,
    "status" "Status" NOT NULL,
    "nextreviewdate" TIMESTAMP(3),
    "reviewcount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_id_key" ON "User"("email_id");

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
