import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";

// =====================
// USERS
// =====================
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  email_verified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// =====================
// SESSIONS
// =====================
export const session = pgTable("session", {
  id: text("id").primaryKey(),
  token: text("token").notNull().unique(),
  expires_at: timestamp("expires_at").notNull(),
  ip_address: text("ip_address"),
  user_agent: text("user_agent"),
  user_id: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// =====================
// ACCOUNTS
// =====================
export const account = pgTable("account", {
  id: text("id").primaryKey(),
  account_id: text("account_id").notNull(),
  provider_id: text("provider_id").notNull(),
  user_id: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  access_token: text("access_token"),
  refresh_token: text("refresh_token"),
  id_token: text("id_token"),
  access_token_expires_at: timestamp("access_token_expires_at"),
  refresh_token_expires_at: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// =====================
// VERIFICATIONS
// =====================
export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expires_at: timestamp("expires_at").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// =====================
// CATEGORIES
// =====================
export const categoryTable = pgTable("category", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// =====================
// BANNERS
// =====================
export const bannerTable = pgTable("banner", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  desktop_image: text("desktop_image").notNull(),
  mobile_image: text("mobile_image").notNull(),
  category_id: text("category_id").notNull().references(() => categoryTable.id, { onDelete: "cascade" }),
  slug: text("slug").notNull().unique(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// =====================
// PRODUCTS
// =====================
export const productTable = pgTable("product", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  slug: text("slug").notNull().unique(),
  category_id: text("category_id").notNull().references(() => categoryTable.id, { onDelete: "cascade" }),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});


export const productVariationTable = pgTable("product_variation", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  price: integer("price").notNull(), // em centavos
  product_id: text("product_id").notNull().references(() => productTable.id, { onDelete: "cascade" }),
  slug: text("slug").notNull(),
  color: text("color").notNull(),
  image_url: text("image_url").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});


export const productVariationRelations = relations(productVariationTable, ({ one,  }) => ({
  product: one(productTable, {
    fields: [productVariationTable.product_id],
    references: [productTable.id],
  }),
}))

// =====================
// RELAÇÕES
// =====================
export const categoryRelations = relations(categoryTable, ({ many }) => ({
  products: many(productTable),
  banners: many(bannerTable),
}),

);

export const bannerRelations = relations(bannerTable, ({ one }) => ({
  category: one(categoryTable, {
    fields: [bannerTable.category_id],
    references: [categoryTable.id],
  }),
}));

export const productRelations = relations(productTable, ({ one,many }) => ({
  category: one(categoryTable, {
    fields: [productTable.category_id],
    references: [categoryTable.id],
  }),

  variations: many(productVariationTable),
}));
