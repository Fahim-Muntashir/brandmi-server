/*
  Warnings:

  - Changed the type of `otpCode` on the `OtpValidation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "OtpValidation" DROP COLUMN "otpCode",
ADD COLUMN     "otpCode" INTEGER NOT NULL;
