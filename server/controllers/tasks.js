import Task from "../models/Task.js";
import User from "../models/user.js";

/* CREATE */
export const createTask = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newTask = new Task({
      userId,
      userFirstName: user.firstName,
      userLastName: user.lastName,
      description,
      group: user.group
    });
    await newTask.save();

    const task = await Task.find();
    res.status(201).json(task);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedTasks = async (req, res) => {
  try {
    const task = await Task.find();
    res.status(200).json(task);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserTasks = async (req, res) => {
  try {
    const { userId } = req.params;
    const task = await Task.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
