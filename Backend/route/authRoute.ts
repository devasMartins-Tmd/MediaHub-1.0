import express from 'express';
import cors from 'cors';
import { getUser, getWelcomeRoute } from '../controllers/get';
import { postAuthToLogin, postAuthToSignUp } from '../controllers/post';

const authRoute = express.Router();
authRoute.use(cors({ origin: '*' }));
authRoute.use(express.json({ limit: '300mb' }));
authRoute.use(express.urlencoded({ extended: true }));

authRoute.route('/welcome').get(getWelcomeRoute);
authRoute.route('/auth/signup').post(postAuthToSignUp);
authRoute.route('/auth/login').post(postAuthToLogin);
authRoute.route('/getUser').get(getUser);

module.exports = authRoute;
