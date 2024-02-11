CREATE TABLE IF NOT EXISTS "nft_balances" (
	"user_id" integer NOT NULL,
	"nft_contract_id" integer NOT NULL,
	"balance" integer NOT NULL,
	CONSTRAINT "nft_balances_user_id_nft_contract_id_pk" PRIMARY KEY("user_id","nft_contract_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nft_contracts" (
	"id" serial PRIMARY KEY NOT NULL,
	"player_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"address" varchar(256) NOT NULL,
	"name" varchar(256) NOT NULL,
	"symbol" varchar(32) NOT NULL,
	"total_supply" integer NOT NULL,
	"picture" varchar(1024),
	CONSTRAINT "nft_contracts_player_id_unique" UNIQUE("player_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "players" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"first_name" varchar(256) NOT NULL,
	"last_name" varchar(256) NOT NULL,
	"birth_date" date NOT NULL,
	"position" varchar(2),
	"country_code" char(2),
	"team_id" integer,
	"picture" varchar(1024)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"player_id" integer NOT NULL,
	"content" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "teams" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"abbreviation" varchar(10),
	"country_code" char(2)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"image" text
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
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "posts" ("player_id","created_at");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nft_balances" ADD CONSTRAINT "nft_balances_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nft_balances" ADD CONSTRAINT "nft_balances_nft_contract_id_nft_contracts_id_fk" FOREIGN KEY ("nft_contract_id") REFERENCES "nft_contracts"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nft_contracts" ADD CONSTRAINT "nft_contracts_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE restrict ON UPDATE no action;
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
 ALTER TABLE "posts" ADD CONSTRAINT "posts_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
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
 ALTER TABLE "technical_stats" ADD CONSTRAINT "technical_stats_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
