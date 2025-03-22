import { pgTable, text, boolean, serial  } from 'drizzle-orm/pg-core';

// Define the users table
export const users = pgTable('users', {
    id: serial('id').primaryKey(), 
    email: text('email').notNull().unique(),
    password: text('password'),
    role: text('role').notNull(), 
    googleId: text('google_id'),
    image: text('image'),
    isVerified: boolean('is_verified').notNull().default(false),
});
