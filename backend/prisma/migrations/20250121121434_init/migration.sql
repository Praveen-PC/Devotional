/*
  Warnings:

  - You are about to drop the `_programtouser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_programtouser` DROP FOREIGN KEY `_programTouser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_programtouser` DROP FOREIGN KEY `_programTouser_B_fkey`;

-- AlterTable
ALTER TABLE `program` ADD COLUMN `userid` INTEGER NULL;

-- DropTable
DROP TABLE `_programtouser`;

-- AddForeignKey
ALTER TABLE `program` ADD CONSTRAINT `program_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
