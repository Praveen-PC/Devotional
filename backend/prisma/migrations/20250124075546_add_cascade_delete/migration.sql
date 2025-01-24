-- DropForeignKey
ALTER TABLE `devotees` DROP FOREIGN KEY `devotees_programId_fkey`;

-- DropIndex
DROP INDEX `devotees_programId_fkey` ON `devotees`;

-- AddForeignKey
ALTER TABLE `devotees` ADD CONSTRAINT `devotees_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `program`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
