
import { relations } from "drizzle-orm";
import { boolean, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";



export const statusEnum = pgEnum("status", ["active", "inactive", "blocked", "pending"]);
export const roleEnum = pgEnum("role", ["buyer", "seller", "admin", "superAdmin"]);
export const userTable = pgTable("users", {
    id: uuid().defaultRandom().primaryKey(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: text().notNull(),
    role: roleEnum().notNull().default("buyer"),
    status: statusEnum().notNull().default("active"),
    passwordChangeAt: timestamp(),
    roleChangeAt: timestamp(),
    otherDevicesLogOutAt: timestamp(),
    isActive:boolean().default(false),
    isDeleted: boolean().default(false),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow(),
  });



  export const genderEnum = pgEnum("gender", ["male", "female", "other"]);
export const buyerTable = pgTable("buyers", {
    id: uuid().defaultRandom().primaryKey(),
    userId: uuid().unique().notNull(),
    firstName: varchar({ length: 100 }).notNull(),
    lastName: varchar({ length: 100 }).notNull(),
    gender: genderEnum().notNull(),
    dateOfBirth: timestamp(),
    contactNo: varchar({ length: 20 }),
    contactName: varchar({ length: 100 }),
    presentAddress: text(),
    profileImage: text(),
    isDeleted: boolean().default(false),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow(),
  });


  export const buyerRelationWithUser = relations(buyerTable, ({ one }) => ({
    user: one(userTable, {
      fields: [buyerTable.userId],
      references: [userTable.id],
    }),
  }));