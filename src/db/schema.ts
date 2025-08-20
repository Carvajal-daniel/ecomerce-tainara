import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";

// =====================
// USERS
// =====================
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
  .$defaultFn(() => false)
  .notNull(),

  image: text("image"),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()).notNull(),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()).notNull(),
});


// =====================
// SESSIONS
// =====================
export const session = pgTable("session", {
  id: text("id").primaryKey(),
  token: text("token").notNull().unique(),
  userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expiresAt").notNull(), // timestamp verdadeiro
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  createdAt: timestamp("createdAt").$defaultFn(() => new Date()).notNull(),
  updatedAt: timestamp("updatedAt").$defaultFn(() => new Date()).notNull(),
});

// =====================
// ACCOUNTS
// =====================
export const account = pgTable("account", {
  id: text("id").primaryKey(),
 accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()).notNull(),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()).notNull(),
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
  imageUrl: text("imageUrl").notNull(),
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
  is_active: boolean("is_active").default(false).notNull(),
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


export const featuredTable = pgTable("featured", {
  id: text("id").primaryKey(),
  product_id: text("product_id")
    .notNull()
    .references(() => productTable.id, { onDelete: "cascade" }),
  order: integer("order").default(0),
  starts_at: timestamp("starts_at"),
  is_offer: boolean("is_offer").default(false).notNull(),
  is_new: boolean("is_new").default(false).notNull(),
  is_featured: boolean("is_featured").default(false).notNull(),
  ends_at: timestamp("ends_at"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(), // adicionar
});


export const featuredRelations = relations(featuredTable, ({ one }) => ({
  product: one(productTable, {
    fields: [featuredTable.product_id],
    references: [productTable.id],
  }),
}));


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
