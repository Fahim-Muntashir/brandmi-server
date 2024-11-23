import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { config } from ".";
import { User } from "../modules/model/user.model";
import { generateTokens } from "../helpers/generateToken";

passport.use(
    new GoogleStrategy(
        {
            clientID: config.GOOGLE_CLIENT_ID as string,
            clientSecret: config.GOOGLE_CLIENT_SECRET as string,
            callbackURL: config.callbackURL,
        },
        async (accessToken, refreshToken, profile, cb) => {


            try {
                let user = await User.findOne({ email: profile._json.email });

                if (!user) {
                    user = await User.create({
                        name: profile._json.name,
                        email: profile._json.email,
                        role: "user",
                    });
                }

                // Generate tokens
                const jwtPayload = {
                    userId: user._id,
                    userName: user.name,
                    role: user.role,
                    email: user.email,
                };

                const accessToken = generateTokens({
                    user: jwtPayload,
                    secretToken: config.ACCESS_TOKEN_SECRET as string,
                    expiredDate: config.ACCESS_TOKEN_EXPIRED as string,
                });

                const refreshToken = generateTokens({
                    user: jwtPayload,
                    secretToken: config.REFRESH_TOKEN_SECRET as string,
                    expiredDate: config.REFRESH_TOKEN_EXPIRED as string,
                });

                // Pass user and tokens to the callback
                // Pass user and tokens in the callback
                return cb(null, { user, accessToken, refreshToken });
            } catch (error) {
                return cb(error);
            }
        }
    )
);
