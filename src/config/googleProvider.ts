import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { config } from ".";
import { generateTokens } from "../helpers/generateToken";
import { User } from "../modules/user/user.model";

passport.use(
    new GoogleStrategy(
        {
            clientID: config.GOOGLE_CLIENT_ID as string,
            clientSecret: config.GOOGLE_CLIENT_SECRET as string,
            callbackURL: config.callbackURL,
            passReqToCallback: true, // Enable passing req to callback
        },
        async (req, accessToken, refreshToken, profile, cb) => {

            try {
                const state = req.query.state as string;

                // Safely parse the state
                const parsedState = JSON.parse(state);
                const { mode, role } = parsedState;
                // login page => check user exit or not . if exit proceed to login
                let user = await User.findOne({ email: profile._json.email });

                if (mode === "login") {
                    if (!user) {
                        return cb({ code: 'LOGIN_ERROR', message: 'You have to create an account! go to register page and create an account' });

                    }
                }


                // Logic for Registration Mode
                if (mode === "registration") {
                    if (user) {
                        return cb({ code: "REGISTRATION_ERROR", message: "User already exists. Please login instead." });
                    }
                    // Create a new user
                    user = await User.create({
                        name: profile._json.name,
                        email: profile._json.email,
                        image: profile._json.picture,
                        role: role
                    });
                    // If we reach here, we have a valid `user`

                }

                if (!user) {
                    return cb({ code: "UNKNOWN_ERROR", message: "Something went wrong while processing the user." });
                }

                // Generate tokens
                const jwtPayload = {
                    userId: user._id,
                    userName: user.name,
                    role: user.role,
                    image: user?.image,
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

                // Pass user and tokens in the callback
                return cb(null, { user, accessToken, refreshToken });
            } catch (error) {
                return cb(error);
            }
        }
    )
);
