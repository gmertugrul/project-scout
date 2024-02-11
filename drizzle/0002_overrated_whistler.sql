CREATE TABLE IF NOT EXISTS "ipo_transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"ipo_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"balance" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nfts" (
	"nft_contract_id" integer NOT NULL,
	"index" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_in_treasury" boolean DEFAULT true NOT NULL,
	CONSTRAINT "nfts_nft_contract_id_index_pk" PRIMARY KEY("nft_contract_id","index")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ipo_transactions" ADD CONSTRAINT "ipo_transactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ipo_transactions" ADD CONSTRAINT "ipo_transactions_ipo_id_ipos_id_fk" FOREIGN KEY ("ipo_id") REFERENCES "ipos"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nfts" ADD CONSTRAINT "nfts_nft_contract_id_nft_contracts_id_fk" FOREIGN KEY ("nft_contract_id") REFERENCES "nft_contracts"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
