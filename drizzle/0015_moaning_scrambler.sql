ALTER TABLE "users" ADD COLUMN "external_id" varchar(1024);--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_external_id_unique" UNIQUE("external_id");