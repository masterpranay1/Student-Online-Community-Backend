import expressAsyncHandler from "express-async-handler";
import Channel from "../models/channel.model.js";
import User from "../models/user.model.js"


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

const joinChannel = expressAsyncHandler(async (req, res) => {
    if (req.body.channelId) {
        const channel = await Channel.findOne({ channelId: req.body.channelId });
        if (channel) {
            const user = await User.findOne({ _id: req.user._id });
            const channelId = channel._id;
            if(!user) {
                res.status(404);
                throw new Error('User not found');
            } else {
                const channelExist = user.channels.find(channel => channel.channelId == channelId);
                if(channelExist) {
                    res.status(400);
                    throw new Error('User already joined this channel');
                } else {
                    user.channels.push({
                        channelId: channelId,
                        role: 'member'
                    });
                    await user.save();
                    res.status(200).json({
                        message: 'User joined the channel'
                    });
                }
            }
        }
    } else {
        res.status(400);
        throw new Error('Invalid channel id');
    }
})

const getAllUsersOfChannel = expressAsyncHandler(async (req, res) => {
    const channelId = req.params.channelId;
    const channel = await Channel.findOne({ channelId: channelId });

    if(channel) {
        const id = channel._id;
        const users = await User.find({ channels: { $elemMatch: { channelId: id } } });
        res.status(200).json({
            users
        });
    } else {
        res.status(400);
        throw new Error('Invalid channel id');
    }
})


export { getAllChannels, getChannelById, joinChannel, getAllUsersOfChannel };