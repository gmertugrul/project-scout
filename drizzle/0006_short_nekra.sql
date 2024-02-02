CREATE TABLE IF NOT EXISTS "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"player_id" integer NOT NULL,
	"content" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "players" ALTER COLUMN "position" SET DATA TYPE varchar(2);--> statement-breakpoint
ALTER TABLE "teams" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "posts" ("player_id","created_at");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
