/* eslint-disable @typescript-eslint/no-unused-vars */
// src/modules/routes/google.route.ts
import { Router } from 'express';
import passport from 'passport';
import '../../config/googleProvider'; // Ensure passport strategy is configured
import { config } from '../../config';
import { GoogleController } from './google.controllers';
import { GoogleOneTap } from './googleOneTap..controllers';

const router = Router();
router.post("/googleOneTap", GoogleOneTap.googleOneTapLogin)

router.get(
    '/', (req, res, next) => {
        const { mode, role } = req.query
        passport.authenticate('google', {
            session: false,
            state: JSON.stringify({ mode, role }), // Pass mode as state
            scope: ['profile', 'email']
        })(req, res, next)
    }

);




router.get(
    '/callback',
    (req, res, next) => {
        passport.authenticate(
            'google',
            { session: false }, (err, user, info) => {
                GoogleController.callback(err, user, req, res)

            }

        )(req, res, next)
    },
);


export const GoogleRoute = router;
