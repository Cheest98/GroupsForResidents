import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userFirstName: { type: String },
  userLastName: { type: String },
  title:{ type: String},
  description: { type: String },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

export default Task;
  //    status: {type: boolean, required: true},