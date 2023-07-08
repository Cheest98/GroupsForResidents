import Event from "../models/event.js";
import User from "../models/user.js";
import Group from "../models/group.js";

export const createEvent = async (req, res) => {
    const { title, description, startDate, endDate, userId} = req.body;

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }


    const newEvent = new Event({ 
        title,
        description, 
        startDate, 
        endDate, 
        createdBy: userId,
        group: user.group });

    try {
        await newEvent.save();

        res.status(201).json(newEvent);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

//to fix - not working 

export const getGroupEvents = async (req, res) => {
    try {
        const { groupId } = req.params;
        
        const events = await Event.find({ group: groupId }).populate('createdBy', 'firstName lastName');

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//