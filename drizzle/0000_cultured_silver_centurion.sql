CREATE TABLE IF NOT EXISTS "countries" (
	"id" char(2) PRIMARY KEY NOT NULL,
	"name" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "goalkeeper_stats" (
	"player_id" integer PRIMARY KEY NOT NULL,
	"aerial_reach" integer,
	"command_of_area" integer,
	"communication" integer,
	"eccentricity" integer,
	"first_touch" integer,
	"handling" integer,
	"kicking" integer,
	"one_on_ones" integer,
	"passing" integer,
	"punching" integer,
	"reflexes" integer,
	"rushing_out" integer,
	"throwing" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mental_stats" (
	"player_id" integer PRIMARY KEY NOT NULL,
	"aggression" integer,
	"anticipation" integer,
	"bravery" integer,
	"composure" integer,
	"concentration" integer,
	"decisions" integer,
	"determination" integer,
	"flair" integer,
	"leadership" integer,
	"off_the_ball" integer,
	"positioning" integer,
	"teamwork" integer,
	"vision" integer,
	"work_rate" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "physical_stats" (
	"player_id" integer PRIMARY KEY NOT NULL,
	"acceleration" integer,
	"agility" integer,
	"balance" integer,
	"jumping_reach" integer,
	"natural_fitness" integer,
	"pace" integer,
	"stamina" integer,
	"strength" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "players" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(256) NOT NULL,
	"last_name" varchar(256) NOT NULL,
	"birth_date" date,
	"position" varchar(20),
	"country_id" char(2),
	"team_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "teams" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "technical_stats" (
	"player_id" integer PRIMARY KEY NOT NULL,
	"corners" integer,
	"crossing" integer,
	"dribbling" integer,
	"finishing" integer,
	"first_touch" integer,
	"free_kick_taking" integer,
	"heading" integer,
	"long_shots" integer,
	"long_throws" integer,
	"marking" integer,
	"passing" integer,
	"penalty_taking" integer,
	"tackling" integer,
	"technique" integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "countries_name_index" ON "countries" ("name");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "goalkeeper_stats" ADD CONSTRAINT "goalkeeper_stats_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mental_stats" ADD CONSTRAINT "mental_stats_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "physical_stats" ADD CONSTRAINT "physical_stats_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "players" ADD CONSTRAINT "players_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "players" ADD CONSTRAINT "players_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "technical_stats" ADD CONSTRAINT "technical_stats_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
