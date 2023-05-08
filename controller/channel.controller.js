import expressAsyncHandler from "express-async-handler";
import Channel from "../models/channel.model.js";


const getAllChannels = expressAsyncHandler(async (req, res) => {
    const channels = await Channel.find({});
    const channelsId = channels.map(channel => channel.channelId);
    if(channels) {
        res.status(200).json({
            channelsId
        });
    }
})

const getChannelById = expressAsyncHandler(async (req, res) => {
    const channel = await Channel.findOne({ channelId: req.params.channelId });
    if(channel) {
        res.status(200).json({
            channel
        });
    }
})

export { getAllChannels, getChannelById };