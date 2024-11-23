// src/modules/routes/google.route.ts
import { Router } from 'express';
import passport from 'passport';
import '../../config/googleProvider'; // Ensure passport strategy is configured
import { config } from '../../config';
import { GoogleController } from './google.controllers';

const router = Router();

router.get(
    '/',
    passport.authenticate('google', { session: false, scope: ['profile', 'email'] })
);

router.get(
    '/callback',
    passport.authenticate('google', {
        session: false,
        failureRedirect: `${config.FRONTED_HOST}/login`
    }),
    GoogleController.callback
);

export const GoogleRoute = router;
