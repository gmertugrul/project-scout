DO $$ BEGIN
 CREATE TYPE "ipo_status" AS ENUM('pending', 'active', 'finished', 'canceled');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "ipos" ADD COLUMN "status" "ipo_status" DEFAULT 'pending' NOT NULL;