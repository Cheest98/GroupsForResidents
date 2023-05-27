import Post from "../models/Post.js";
import User from "../models/user.js";
export const  createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    
    const user = await User.findById(userId);
    const newPost = new Post({
      user:userId,
      userFirstName: user.firstName,
      userLastName: user.lastName,
      title,
      description,
      picturePath,
      userPicturePath: user.picturePath,
      group: user.group
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};