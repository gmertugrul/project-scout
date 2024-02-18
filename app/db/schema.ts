import { relations } from "drizzle-orm/relations";

import {
  bigint,
  boolean,
  char,
  date,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import {
  goalkeeperStats,
  mentalStats,
  physicalStats,
  technicalStats,
} from "./schema.stats";

export * from "./schema.stats";

export const userRole = pgEnum("user_role", ["user", "admin", "disabled"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  role: userRole("role").notNull().default("user"),
  name: text("name"),
  email: text("email").notNull(),
  image: text("image"),
});

export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  abbreviation: varchar("abbreviation", { length: 10 }),
  countryCode: char("country_code", { length: 2 }),
  picture: varchar("picture", { length: 1024 }),
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

export const starredPlayers = pgTable(
  "starred_players",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),
    playerId: integer("player_id")
      .notNull()
      .references(() => players.id, {
        onDelete: "cascade",
      }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.playerId] }),
    pi: index().on(table.playerId),
  }),
);

export const nftContracts = pgTable("nft_contracts", {
  id: serial("id").primaryKey(),
  playerId: integer("player_id")
    .notNull()
    .references(() => players.id, {
      onDelete: "restrict",
    })
    .unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  address: varchar("address", { length: 256 }).notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  symbol: varchar("symbol", { length: 32 }).notNull(),
  totalSupply: integer("total_supply").notNull(),
  picture: varchar("picture", { length: 1024 }),
});

export const nfts = pgTable(
  "nfts",
  {
    nftContractId: integer("nft_contract_id")
      .notNull()
      .references(() => nftContracts.id, {
        onDelete: "restrict",
      }),
    index: integer("index").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    isInTreasury: boolean("is_in_treasury").notNull().default(true),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.nftContractId, table.index] }),
  }),
);

export const ipoStatus = pgEnum("ipo_status", [
  "pending",
  "active",
  "finished",
  "canceled",
]);

export const ipos = pgTable("ipos", {
  id: serial("id").primaryKey(),
  status: ipoStatus("status").notNull().default("pending"),
  nftContractId: integer("nft_contract_id")
    .notNull()
    .references(() => nftContracts.id, {
      onDelete: "restrict",
    })
    .unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  startsAt: timestamp("starts_at", { withTimezone: true }),
  endsAt: timestamp("ends_at", { withTimezone: true }),
  totalSupply: integer("total_supply").notNull(),
  unitPrice: bigint("unit_price", { mode: "bigint" }).notNull(),
});

export const ipoTransactions = pgTable("ipo_transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "restrict" }),
  ipoId: integer("ipo_id")
    .notNull()
    .references(() => ipos.id, { onDelete: "restrict" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  balance: integer("balance").notNull(),
});

export const nftBalances = pgTable(
  "nft_balances",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    nftContractId: integer("nft_contract_id")
      .notNull()
      .references(() => nftContracts.id, { onDelete: "restrict" }),
    balance: integer("balance").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.nftContractId] }),
  }),
);

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
  }),
);

export const nftsRelations = relations(nfts, ({ one }) => ({
  nftContract: one(nftContracts, {
    fields: [nfts.nftContractId],
    references: [nftContracts.id],
  }),
}));

export const iposRelations = relations(ipos, ({ one, many }) => ({
  transactions: many(ipoTransactions),
  nftContract: one(nftContracts, {
    fields: [ipos.nftContractId],
    references: [nftContracts.id],
  }),
}));

export const ipoTransactionsRelations = relations(
  ipoTransactions,
  ({ one }) => ({
    ipo: one(ipos, {
      fields: [ipoTransactions.ipoId],
      references: [ipos.id],
    }),
  }),
);

export const nftContractsRelations = relations(
  nftContracts,
  ({ one, many }) => ({
    ipos: many(ipos),
    nfts: many(nfts),
    player: one(players, {
      fields: [nftContracts.playerId],
      references: [players.id],
    }),
  }),
);

export const teamsRelations = relations(teams, ({ many }) => ({
  players: many(players),
}));

export const playersRelations = relations(players, ({ one, many }) => ({
  nftContracts: many(nftContracts),
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

export type Nft = typeof nfts.$inferSelect;
export type NftInsert = typeof nfts.$inferInsert;

export type StarredPlayer = typeof starredPlayers.$inferSelect;
export type StarredPlayerInsert = typeof starredPlayers.$inferInsert;

export type NftContract = typeof nftContracts.$inferSelect;
export type NftContractInsert = typeof nftContracts.$inferInsert;

export type NftBalance = typeof nftBalances.$inferSelect;
export type NftBalanceInsert = typeof nftBalances.$inferInsert;

export type User = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;

export type Ipo = typeof ipos.$inferSelect;
export type IpoInsert = typeof ipos.$inferInsert;

export type IpoTransaction = typeof ipoTransactions.$inferSelect;
export type IpoTransactionInsert = typeof ipoTransactions.$inferInsert;

export type Team = typeof teams.$inferSelect;
export type TeamInsert = typeof teams.$inferInsert;

export type Post = typeof posts.$inferSelect;
export type PostInsert = typeof posts.$inferInsert;

export type TechnicalStats = typeof technicalStats.$inferSelect;
export type PhysicalStats = typeof physicalStats.$inferSelect;
export type MentalStats = typeof mentalStats.$inferSelect;
export type GoalkeeperStats = typeof goalkeeperStats.$inferSelect;
