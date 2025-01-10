/*
  Warnings:

  - Added the required column `isPublic` to the `WorkSpace` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "headlines" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "WorkSpace" ADD COLUMN     "isPublic" BOOLEAN NOT NULL;
