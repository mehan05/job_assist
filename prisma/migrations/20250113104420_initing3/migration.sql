/*
  Warnings:

  - Added the required column `deadline` to the `JobBoard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postBy` to the `JobBoard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobBoard" ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "postBy" TEXT NOT NULL;
