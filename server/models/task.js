import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userFirstName: { type: String },
  userLastName: { type: String },
  title:{ type: String},
  description: { type: String },
  status:{ type: String, enum: ['todo', 'doing', 'done'], default: 'todo' },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

export default Task;
  //    status: {type: boolean, required: true},