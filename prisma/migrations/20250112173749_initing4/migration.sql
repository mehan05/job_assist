/*
  Warnings:

  - Added the required column `createdBy` to the `WorkSpace` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "skills" SET DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "WorkSpace" ADD COLUMN     "createdBy" TEXT NOT NULL;
