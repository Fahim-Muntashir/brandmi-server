/* eslint-disable @typescript-eslint/no-explicit-any */
// src/modules/controllers/google.controller.ts
import { Response } from 'express';
import { config } from '../../config';

export const GoogleController = {
    callback: (req: any, res: Response) => {
        const { accessToken, refreshToken } = req.user;
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
        });
        res.cookie('accessToken', accessToken, {
            secure: process.env.NODE_ENV === 'production',
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
