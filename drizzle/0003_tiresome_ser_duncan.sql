ALTER TABLE "ipos" ADD COLUMN "starts_at" timestamp;--> statement-breakpoint
ALTER TABLE "ipos" ADD COLUMN "ends_at" timestamp;--> statement-breakpoint
ALTER TABLE "ipos" ADD COLUMN "total_supply" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "ipos" ADD COLUMN "unit_price" numeric(10, 2) NOT NULL;