/*
  Warnings:

  - You are about to drop the column `notes` on the `JobApplication` table. All the data in the column will be lost.
  - The `status` column on the `JobApplication` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "APPLICATION_STATUS" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "JobApplication" DROP COLUMN "notes",
DROP COLUMN "status",
ADD COLUMN     "status" "APPLICATION_STATUS" NOT NULL DEFAULT 'PENDING';
