/*
  Warnings:

  - You are about to drop the column `concactEmail` on the `JobBoard` table. All the data in the column will be lost.
  - Added the required column `conctactEmail` to the `JobBoard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employmentType` to the `JobBoard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salaryFrom` to the `JobBoard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salaryTo` to the `JobBoard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobBoard" DROP COLUMN "concactEmail",
ADD COLUMN     "conctactEmail" TEXT NOT NULL,
ADD COLUMN     "employmentType" TEXT NOT NULL,
ADD COLUMN     "salaryFrom" INTEGER NOT NULL,
ADD COLUMN     "salaryTo" INTEGER NOT NULL;
