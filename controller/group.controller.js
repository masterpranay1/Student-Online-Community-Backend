import expressAsyncHandler from "express-async-handler";
import Admin from "../models/user.model.js";
import User from "../models/user.model.js";
import Channel from "../models/channel.model.js";
import Group from "../models/group.model.js";

// @desc Create a new group
// @route POST /api/admin/createGroup or /api/moderator/createGroup
// @access Private

const createGroup = expressAsyncHandler(async (req, res) => {
  const { name, groupId, channelId } = req.body;

  const groupExist = await Group.findOne({ groupId });
  if(groupExist) {
    res.status(400);
    throw new Error('Group already exists');
  } else {
    const channel = await Channel.findOne({ channelId: channelId })
    if(!channel) {
      res.status(400);
      throw new Error('Channel does not exist');
    } 
    const actualChannelId = channel._id;
    const group = await Group.create({ name, groupId, channel: actualChannelId });
    if(group) {
      res.status(201).json({
        _id: group._id,
        name: group.name,
        groupId: group.groupId,
        channel: group.channel
      });
    } else {
      res.status(400);
      throw new Error('Invalid group data');
    }
  }
})

// @desc Update the group
// @route PUT /api/admin/updateGroup or /api/moderator/updateGroup
// @access Private

const updateGroup = expressAsyncHandler(async (req, res) => {
  const { name, groupId, channelId } = req.body;
  const groupExist = await Group.findOne({ groupId });
  if(!groupExist) {
    res.status(400);
    throw new Error('Group does not exists');
  } else {
    const channel = await Channel.findOne({ channelId: channelId })
    if(!channel) {
      res.status(400);
      throw new Error('Channel does not exist');
    } 
    const actualChannelId = channel._id;
    const updateGroup = await Group.findOneAndUpdate({
      groupId: groupId,
    }, {
      name: name,
      channel: actualChannelId
    })
    if(updateGroup) {
      res.status(201).json({
        _id: updateGroup._id,
        name: name,
        groupId: updateGroup.groupId,
        channel: updateGroup.channel
      });
    } else {
      res.status(400);
      throw new Error('Invalid group data');
    }
    }
})

// @desc Get all groups
// @route GET /api/channels/getAllGroups
// @access Private to users

const getAllGroups = expressAsyncHandler(async (req, res) => {
  const { channelId } = req.params;
  const channel = await Channel.findOne({ channelId: channelId })

  if(!channel) {
    res.status(400);
    throw new Error('Channel does not exist');
  } else {
    const actualChannelId = channel._id;
    const groups = await Group.find({ channel: actualChannelId });
    if(groups) {
      res.status(201).json(groups);
    } else {
      res.status(400);
      throw new Error('Invalid group data');
    }
  }
})

export {
  createGroup,
  updateGroup,
  getAllGroups
}