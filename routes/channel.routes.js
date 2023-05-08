import express from 'express'
import { protectUser } from '../middleware/auth.middleware.js'
import { getAllChannels, getChannelById, joinChannel, getAllUsersOfChannel } from '../controller/channel.controller.js'
import { getAllGroups } from '../controller/group.controller.js'

const router = express.Router();

router.get('/getAllChannels',  getAllChannels);
router.get('/getChannelById/:channelId',  getChannelById);

router.post('/joinChannel', protectUser,  joinChannel);

router.get('/getUsersOfChannel/:channelId',
  getAllUsersOfChannel
)

router.get('/getAllGroups/:channelId', protectUser, getAllGroups)

export default router;