/* eslint-disable @typescript-eslint/no-explicit-any */
// src/modules/controllers/google.controller.ts
import { Response } from 'express';
import { config } from '../../config';
import { googleErrorMessage } from '../../helpers/googleErrorMessage';

export const GoogleController = {
    callback: (err: any, user: any, req: any, res: Response) => {


        if (err) {
            return res.send(googleErrorMessage(err.message))
        }
        if (!user) {
            // Handle the case where the user is not authenticated
            return res.status(401).send(googleErrorMessage('Authentication failed. Please try again.'));
        }
        const { accessToken, refreshToken } = user;


        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
        });
        res.cookie('accessToken', accessToken, {
            secure: process.env.NODE_ENV === 'production', // true 
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
        });
        res.send(`
            <script>
                window.opener.postMessage({ success: true }, "${config.FRONTED_HOST}");
                window.close();
            </script>
        `);
    },
};
