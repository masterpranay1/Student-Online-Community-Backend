import express from 'express'
import { getAllChannels, getChannelById } from '../controller/channel.controller.js'

const router = express.Router();

router.get('/getAllChannels',  getAllChannels);
router.get('/getChannelById/:channelId',  getChannelById);

export default router;