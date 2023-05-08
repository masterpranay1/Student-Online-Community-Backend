import expressAsyncHandler from "express-async-handler";
import Channel from "../models/channel.model.js";


const getAllChannels = expressAsyncHandler(async (req, res) => {
    const channels = await Channel.find({});
    console.log(channels);
    res.json(channels);
})

export { getAllChannels };