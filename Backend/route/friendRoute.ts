import express from 'express';
import cors from 'cors';
import { updateFriends } from '../controllers/put';

const friendRoute = express.Router();

friendRoute.use(express.json({ limit: '300mb' }));
friendRoute.use(cors({ origin: '*' }));
friendRoute.use(express.urlencoded({ extended: true }));

friendRoute.route('/friend/add').put(updateFriends);

module.exports = friendRoute;
