CREATE TABLE IF NOT EXISTS "ipos" (
	"id" serial PRIMARY KEY NOT NULL,
	"nft_contract_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "ipos_nft_contract_id_unique" UNIQUE("nft_contract_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ipos" ADD CONSTRAINT "ipos_nft_contract_id_nft_contracts_id_fk" FOREIGN KEY ("nft_contract_id") REFERENCES "nft_contracts"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
