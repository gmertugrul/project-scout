DO $$ BEGIN
 CREATE TYPE "nft_listing_status" AS ENUM('active', 'completed', 'canceled');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nft_listings" (
	"user_id" integer NOT NULL,
	"nft_contract_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"status" "nft_listing_status" DEFAULT 'active' NOT NULL,
	"price" bigint NOT NULL
);
--> statement-breakpoint
ALTER TABLE "nft_balances" ALTER COLUMN "balance" SET DATA TYPE bigint;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nft_listings" ADD CONSTRAINT "nft_listings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nft_listings" ADD CONSTRAINT "nft_listings_nft_contract_id_nft_contracts_id_fk" FOREIGN KEY ("nft_contract_id") REFERENCES "nft_contracts"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
