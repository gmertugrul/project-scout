ALTER TABLE "players" ALTER COLUMN "birth_date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "players" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;