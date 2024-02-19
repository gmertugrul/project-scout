ALTER TABLE "users" ALTER COLUMN "credit_balance" SET DATA TYPE numeric(16, 8);--> statement-breakpoint
ALTER TABLE "nft_contracts" ADD COLUMN "is_tradable" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "ipos" DROP COLUMN IF EXISTS "starts_at";--> statement-breakpoint
ALTER TABLE "ipos" DROP COLUMN IF EXISTS "ends_at";