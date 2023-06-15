import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    creator:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    description:{ type: String }, 
    password: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  });

  const Group = mongoose.model("Group", groupSchema)

  export default Group;