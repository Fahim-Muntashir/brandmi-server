import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users.schema';

export const otpValidations = pgTable('otp_validations', {
    id: serial('id').primaryKey(),
    userId: serial('id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    otpCode: integer('otp_code').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

