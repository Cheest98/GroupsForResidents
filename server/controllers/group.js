import User from "../models/user.js";
import Group from "../models/group.js";
import {globalGroup}  from "../data/const.js"


export const createGroup = async (req, res) => {

  try {
    const { userId, name, description, password } = req.body;
    const user = await User.findById(userId);

    const newGroup = new Group({
        name,
        creator: userId,
        description,
        password,
    });

    await newGroup.save();

    // If user has a previous group, remove them from it
    if (user.group) {
      const previousGroup = await Group.findById(user.group);
  
      if (previousGroup) {
          const index = previousGroup.members.indexOf(user._id);
  
          if (index > -1) {
              previousGroup.members.splice(index, 1);
  
              // If there are no members left in the group, delete the group
              if (previousGroup.members.length === 0) {
                  await Group.findByIdAndRemove(previousGroup._id);
              } else {
                  // Make the next person the creator
                  previousGroup.creator = previousGroup.members[0];
                  await previousGroup.save();
              }
          }
      }
    }

    // Add user to the new group
    newGroup.members.push(user._id);
    await newGroup.save();

    // Update the user's group
    user.group = newGroup._id;
    await user.save();

    res.json({ group: newGroup });
  } catch (error) {
      res.status(500)
      .json({ message: 'Failed to create group' });
  }
};

export const addUserToGroup = async (req, res) => {
  const { body: { userId, password }, params: { groupId } } = req;
  try {
    const group = await Group.findById(groupId);

    if (!group) {
        return res.status(404).json({ message: 'Group not found' });
    }
  
    const user = await User.findById(userId);
  
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // check password
    if (group.password !== password) {
        return res.status(403)
        .json({ message: 'Incorrect password' });
    }

    // If user has a previous group, remove them from it
    if (user.group) {
      const previousGroup = await Group.findById(user.group);
    
      if (previousGroup) {
          const index = previousGroup.members.indexOf(user._id);
    
          if (index > -1) {
              previousGroup.members.splice(index, 1);
              if (previousGroup.members.length === 0) {
                  // If there are no members left, delete the group
                  await Group.findByIdAndRemove(previousGroup._id);
              } else {
                  const previousGroupObject = previousGroup.toObject();
                  previousGroupObject.members = previousGroup.members;
                  await Group.findByIdAndUpdate(previousGroup._id, previousGroupObject, { new: true });
              }
          }
      }
    }

    // Add user to the new group
    group.members.push(user._id);
    await group.save();

    // Update the user's group
    user.group = group._id;
    await user.save();

    res.json({ group });

  } catch (error) {
      res.status(500)
      .json({ message: 'Failed to add user to group' });
  }
};

/* READ */
export const getAllGroups = async (req, res) => {
  try {
    const group = await Group.find()
    res.status(200)
    .json(group);

  } catch (err) {

    res.status(404)
    .json({ message: err.message });
  }
};

export const getUserGroup = async (req, res) => {
  const { userId } = req.params;

  try {
      const user = await User.findById(userId).populate('group');

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user.group);

  } catch (error) {

      res.status(500).json({ message: 'Failed to get user group' });
  }
};

export const addUserToGlobalGroup = async (userId) => {
  try {
    const selectedGroup = await Group.findById(globalGroup);
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
  
// DELETE
export const deleteGroup = async (req, res) => {
  const { userId, password } = req.body;
  const { groupId } = req.params;
  const globalGroupId = globalGroup;

  console.log('deleteGroup called with:', req.body, req.params);

  try {
    const group = await Group.findById(groupId);

    if (!group) {
        return res.status(404).json({ message: 'Group not found' });
    }

    // Check if the user is the creator
    if (group.creator.toString() !== userId) {
        return res.status(403).json({ message: 'User is not the creator of the group' });
    }

    // Check if the password is correct
    if (group.password !== password) {
        return res.status(403).json({ message: 'Incorrect password' });
    }

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's group to Global Group and add them to its members
    const globalGroup = await Group.findById(globalGroupId);
    if (!globalGroup) {
        return res.status(404).json({ message: 'Global Group not found' });
    }
    
    user.group = globalGroupId;
    await user.save();

    if (!globalGroup.members.includes(user._id)) {
        globalGroup.members.push(user._id);
        await globalGroup.save();
    }

    // Remove user from the group's members list
    const index = group.members.indexOf(user._id);
    if (index > -1) {
        group.members.splice(index, 1);
    }

    // If there are still members in the group, make the next one the creator
    if (group.members.length > 0) {
        const nextCreator = group.members[0];
        group.creator = nextCreator;
    } else {
        // If there are no members left, delete the group
        await Group.findByIdAndRemove(groupId);
        return res.json({ message: 'Group successfully deleted' });
    }

    // Convert Mongoose document to plain JavaScript object
    const groupObject = group.toObject();

    // Replace members with the updated members list
    groupObject.members = group.members;

    // Save the updated group
    await Group.findByIdAndUpdate(groupId, groupObject, { new: true });

    res.json({ message: 'Group successfully updated' });

  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Failed to update/delete group' });
  }
};