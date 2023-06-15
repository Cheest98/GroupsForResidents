import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userFirstName:{ type: String },
    userLastName:{ type: String },
    description: { type: String, required: true },
    picturePath: { type: String },
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group',},
  }, { timestamps: true} );

  const Post = mongoose.model("Post", postSchema)

  export default Post;