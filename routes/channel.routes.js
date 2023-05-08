import express from 'express'
import { protectUser } from '../middleware/auth.middleware.js'
import { getAllChannels, getChannelById, joinChannel } from '../controller/channel.controller.js'

const router = express.Router();

router.get('/getAllChannels',  getAllChannels);
router.get('/getChannelById/:channelId',  getChannelById);

router.post('/joinChannel', protectUser,  joinChannel);

export default router;