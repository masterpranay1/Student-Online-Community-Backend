import express from 'express'
import { getAllChannels } from '../controller/channel.controller.js'

const router = express.Router();


router.get('/getAllChannels',  getAllChannels);

export default router;