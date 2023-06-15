import Task from "../models/Task.js";
import User from "../models/user.js";

/* CREATE */
export const createTask = async (req, res) => {
  try {
    const { userId, title, description, status } = req.body;

    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
  }

    const newTask = new Task({
      user: userId,
      userFirstName: user.firstName,
      userLastName: user.lastName,
      title,
      description,
      status,
      group: user.group
    });
    await newTask.save();

    const task = await Task.find();
    res.status(201).json(task);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* UPDATE */
export const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    // Sprawdź, czy zadanie istnieje
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Aktualizuj status zadania
    task.status = status;
    await task.save();

    res.status(200).json({ message: "Task status updated", task });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
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

/* DELETE */

export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params; // Poprawne destrukturyzowanie taskId
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};