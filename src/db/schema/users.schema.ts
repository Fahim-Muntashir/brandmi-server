import { pgTable, text, boolean, serial  } from 'drizzle-orm/pg-core';

// Define the users table
export const users = pgTable('users', {
    id: serial('id').primaryKey(), // Auto-incrementing integer ID    name: text('name').notNull(), // Name of the user
    email: text('email').notNull().unique(), // Email address (unique constraint)
    password: text('password'), // User's password (should be encrypted)
    role: text('role').notNull(), // Role of the user (e.g., 'admin', 'user')
    googleId: text('google_id'), // Google ID for OAuth authentication (optional)
    image: text('image'), // User's profile image URL (optional)
    isVerified: boolean('is_verified').notNull().default(false), // Whether the user is verified
});
