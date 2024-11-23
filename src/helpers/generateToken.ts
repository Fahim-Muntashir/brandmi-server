/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken"

export interface JWTPayload {
    userName: string,
    userId: any,
    role: string,
    email: string


}

interface IGenerateToken {
    user: JWTPayload,
    secretToken: string;
    expiredDate: string
}

export const generateTokens = ({ expiredDate, secretToken, user }: IGenerateToken) => {
    const accessToken = jwt.sign(
        user,
        secretToken,
        { expiresIn: expiredDate, algorithm: "HS256" }
    );
    return accessToken

};