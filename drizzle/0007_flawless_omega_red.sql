CREATE TABLE IF NOT EXISTS "starred_players" (
	"user_id" integer NOT NULL,
	"player_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "starred_players_user_id_player_id_pk" PRIMARY KEY("user_id","player_id"),
	CONSTRAINT "starred_players_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "starred_players_player_id_unique" UNIQUE("player_id")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "starred_players_player_id_index" ON "starred_players" ("player_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "starred_players" ADD CONSTRAINT "starred_players_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "starred_players" ADD CONSTRAINT "starred_players_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
