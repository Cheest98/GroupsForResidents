import User from "../models/user.js";
import Group from "../models/group.js";


export const createGroup = async (req, res) => {
    const { name } = req.body;

    try {
        const group = await Group.create({ name });
        res.status(201).json({ group });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create group' });
    }
};
// To fix   
export const addUserToGroup = async (req, res) => {
    const { userId } = req.body;
    const { groupId } = req.params;

    try {
        const group = await Group.findById(groupId);
        const user = await User.findById(userId);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        group.users.push(user);
        await group.save();

        res.json({ group });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add user to group' });
    }
};

/* READ */
export const getAllGroups = async (req, res) => {
  try {
    const group = await Group.find()
    res.status(200).json(group);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addUserToGlobalGroup = async (userId) => {
    try {
      const selectedGroup = await Group.findById('643db2e5ed80753e9ab0b322');
      const currentUser = await User.findById(userId);
  
      if (!selectedGroup) {
        return console.log('Global group not found');
      }
  
      if (!currentUser) {
        return console.log('User not found');
      }
  
      selectedGroup.members.push(currentUser);
      await selectedGroup.save();
  
      console.log(`User ${currentUser.firstName} ${currentUser.lastName} added to global group`);
    } catch (err) {
      console.log(err.message);
    }
  };
