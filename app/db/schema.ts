import { relations } from "drizzle-orm/relations";

import {
  char,
  date,
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { goalkeeperStats, mentalStats, physicalStats, technicalStats } from "./schema.stats";

export * from "./schema.auth"
export * from "./schema.stats"

export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  abbreviation: varchar("abbreviation", { length: 10 }),
  countryCode: char("country_code", { length: 2 }),
});

export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  firstName: varchar("first_name", { length: 256 }).notNull(),
  lastName: varchar("last_name", { length: 256 }).notNull(),
  birthDate: date("birth_date").notNull(),
  position: varchar("position", { length: 2 }),
  countryCode: char("country_code", { length: 2 }),
  teamId: integer("team_id").references(() => teams.id),
  picture: varchar("picture", { length: 1024 }),
});

export const nftContracts = pgTable("nft_contracts", {
  id: serial("id").primaryKey(),
  playerId: integer("player_id")
    .notNull()
    .references(() => players.id, {
      onDelete: "restrict",
    }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  address: varchar("address", { length: 256 }).notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  symbol: varchar("symbol", { length: 32 }).notNull(),
  totalSupply: integer("total_supply").notNull(),
  picture: varchar("picture", { length: 1024 }),
});

export const posts = pgTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    playerId: integer("player_id")
      .notNull()
      .references(() => players.id, {
        onDelete: "cascade",
      }),
    content: text("content").notNull(),
  },
  (table) => ({
    createdAtIdx: index("created_at_idx").on(table.playerId, table.createdAt),
  })
);

export const teamsRelations = relations(teams, ({ many }) => ({
  players: many(players),
}));

export const playersRelations = relations(players, ({ one }) => ({
  team: one(teams, {
    fields: [players.teamId],
    references: [teams.id],
  }),
  posts: one(posts, {
    fields: [players.id],
    references: [posts.playerId],
  }),
  technicalStats: one(technicalStats, {
    fields: [players.id],
    references: [technicalStats.playerId],
  }),
  physicalStats: one(physicalStats, {
    fields: [players.id],
    references: [physicalStats.playerId],
  }),
  mentalStats: one(mentalStats, {
    fields: [players.id],
    references: [mentalStats.playerId],
  }),
  goalkeeperStats: one(goalkeeperStats, {
    fields: [players.id],
    references: [goalkeeperStats.playerId],
  }),
}));

export type Player = typeof players.$inferSelect;
export type PlayerInsert = typeof players.$inferInsert;

export type Team = typeof teams.$inferSelect;
export type TeamInsert = typeof teams.$inferInsert;

export type Post = typeof posts.$inferSelect;
export type PostInsert = typeof posts.$inferInsert;

export type TechnicalStats = typeof technicalStats.$inferSelect;
export type PhysicalStats = typeof physicalStats.$inferSelect;
export type MentalStats = typeof mentalStats.$inferSelect;
export type GoalkeeperStats = typeof goalkeeperStats.$inferSelect;
