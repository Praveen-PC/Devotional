/*
  Warnings:

  - You are about to drop the column `date` on the `program` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `program` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `program` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `program` DROP COLUMN `date`,
    ADD COLUMN `endTime` DATETIME(3) NOT NULL,
    ADD COLUMN `startTime` DATETIME(3) NOT NULL;
