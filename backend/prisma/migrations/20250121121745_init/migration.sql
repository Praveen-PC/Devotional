/*
  Warnings:

  - You are about to drop the column `userid` on the `program` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `program` DROP FOREIGN KEY `program_userid_fkey`;

-- DropIndex
DROP INDEX `program_userid_fkey` ON `program`;

-- AlterTable
ALTER TABLE `program` DROP COLUMN `userid`;

-- CreateTable
CREATE TABLE `_programTouser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_programTouser_AB_unique`(`A`, `B`),
    INDEX `_programTouser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_programTouser` ADD CONSTRAINT `_programTouser_A_fkey` FOREIGN KEY (`A`) REFERENCES `program`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_programTouser` ADD CONSTRAINT `_programTouser_B_fkey` FOREIGN KEY (`B`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
