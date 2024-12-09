/* eslint-disable @typescript-eslint/no-unused-vars */
// src/modules/routes/google.route.ts
import { Router } from 'express';
import passport from 'passport';
import '../../config/googleProvider'; // Ensure passport strategy is configured
import { config } from '../../config';
import { GoogleController } from './google.controllers';

const router = Router();

router.get(
    '/', (req, res, next) => {
        const mode = req.query.mode
        passport.authenticate('google', {
            session: false,
            state: JSON.stringify({ mode }), // Pass mode as state
            scope: ['profile', 'email']
        })(req, res, next)
    }

);

router.get(
    '/callback',
    (req, res, next) => {
        passport.authenticate(
            'google',
            { session: false },
            (err, user, info) => {

                if (err) {
                    return res.send(`
                        <html>
                            <head>
                                <title>Error</title>
                                <style>
                                    body { font-family: Arial, sans-serif; background-color: #f8d7da; color: #721c24; padding: 20px; }
                                    .error-container { text-align: center; padding: 20px; border: 1px solid #f5c6cb; background-color: #f8d7da; }
                                </style>
                            </head>
                            <body>
                                <div class="error-container">
                                    <h1>Authentication Error</h1>
                                    <p>${err.message}</p>
                                    <button onclick="window.close()">Close</button>
                                </div>
                            </body>
                        </html>
                    `);
                }
                req.user = user;
                next();
            }
        )(req, res, next); // Call the authenticate function with req, res, next
    },
    GoogleController.callback
);


export const GoogleRoute = router;
