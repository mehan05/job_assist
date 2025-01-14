/*
  Warnings:

  - Added the required column `postBy` to the `JobBoard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobBoard" ADD COLUMN     "postBy" TEXT NOT NULL;
