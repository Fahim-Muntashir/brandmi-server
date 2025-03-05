
import { eq } from "drizzle-orm";
import emailTransporter from "../../config/emailTransport";
import otpEmail from "../../emails/otpEmail";
import { AppError } from "../../middleware/globalErrorHandler";
import { db } from "../../db/db";
import { users } from "../../db/schema/users.schema";
import { otpValidations } from "../../db/schema/otpValidation.schema";

const createUser = async (payload: any) => {

    console.log(payload);
    // 1. User validation
    const existingUser = await db.select().from(users).where(eq(users.email, payload.email));
    if (existingUser.length > 0) {
        throw new AppError("Email already registered", 400);
    }

    // 2. Generate a six-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000);

    // 3. Save user and OTP code using a transaction
    try {
        await db.transaction(async (tx) => {
            const [user] = await tx.insert(users).values({ ...payload }).returning();
            await tx.insert(otpValidations).values({ userId: user.id, otpCode });
        });

        // 4. Send verification email
        try {
            await emailTransporter.sendMail(otpEmail(payload.email, otpCode));
            console.log("Email has been sent!");
        } catch (error) {
            console.error("Email sending failed", error);
        }

        // 5. Return the user object
        return {
            name: payload.name,
            email: payload.email,
            role: payload.role
        };
    } catch (error) {
        throw new AppError("User creation failed", 500);
    }
};

const myProfile = async (userId: string) => {
    const user = await db.select().from(users).where(eq(users.id, userId));

    if (user.length === 0) {
        throw new AppError("Sorry! There is no user", 401);
    }
    return user[0];
};

export const UserServices = {
    createUser, 
    myProfile
};
