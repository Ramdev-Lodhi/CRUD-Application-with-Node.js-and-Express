-- AddForeignKey
ALTER TABLE `login` ADD CONSTRAINT `login_email_fkey` FOREIGN KEY (`email`) REFERENCES `user`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
