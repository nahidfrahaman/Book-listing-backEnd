/*
  Warnings:

  - You are about to drop the column `order_id` on the `orders` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_order_id_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "order_id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
