/*
  Warnings:

  - You are about to drop the `_programtouser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_programtouser` DROP FOREIGN KEY `_programTouser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_programtouser` DROP FOREIGN KEY `_programTouser_B_fkey`;

-- DropTable
DROP TABLE `_programtouser`;

-- CreateTable
CREATE TABLE `_UserPrograms` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_UserPrograms_AB_unique`(`A`, `B`),
    INDEX `_UserPrograms_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_UserPrograms` ADD CONSTRAINT `_UserPrograms_A_fkey` FOREIGN KEY (`A`) REFERENCES `program`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserPrograms` ADD CONSTRAINT `_UserPrograms_B_fkey` FOREIGN KEY (`B`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
