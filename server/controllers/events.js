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



export const getGroupEvents = async (req, res) => {
    try {
        const { groupId } = req.params;
        
        const events = await Event.find({ group: groupId })

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteEvent = async (req, res) => {
    try {
      const { eventId } = req.params;
  
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      await Event.findByIdAndRemove(eventId);
  
      res.json({ message: 'Event deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const updateEvent = async (req, res) => {
    try {
      const { eventId } = req.params;
      const { title, description, startDate, endDate } = req.body;
  
    
      const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        { title, description, startDate, endDate,  },
        { new: true } 
      );
  
      if (!updatedEvent) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(updatedEvent);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  