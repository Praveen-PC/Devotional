/*
  Warnings:

  - You are about to alter the column `contribution` on the `devotees` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to drop the `_programtouser` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `userId` on table `devotees` required. This step will fail if there are existing NULL values in that column.
  - Made the column `programId` on table `devotees` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `_programtouser` DROP FOREIGN KEY `_programTouser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_programtouser` DROP FOREIGN KEY `_programTouser_B_fkey`;

-- DropForeignKey
ALTER TABLE `devotees` DROP FOREIGN KEY `devotees_programId_fkey`;

-- DropForeignKey
ALTER TABLE `devotees` DROP FOREIGN KEY `devotees_userId_fkey`;

-- DropIndex
DROP INDEX `devotees_programId_fkey` ON `devotees`;

-- DropIndex
DROP INDEX `devotees_userId_fkey` ON `devotees`;

-- AlterTable
ALTER TABLE `devotees` MODIFY `contribution` DOUBLE NOT NULL,
    MODIFY `userId` INTEGER NOT NULL,
    MODIFY `programId` INTEGER NOT NULL;

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
ALTER TABLE `devotees` ADD CONSTRAINT `devotees_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `devotees` ADD CONSTRAINT `devotees_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `program`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserPrograms` ADD CONSTRAINT `_UserPrograms_A_fkey` FOREIGN KEY (`A`) REFERENCES `program`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserPrograms` ADD CONSTRAINT `_UserPrograms_B_fkey` FOREIGN KEY (`B`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
