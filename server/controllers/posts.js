import Post from "../models/Post.js";
import User from "../models/user.js";

export const  createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
  }

    const newPost = new Post({
      user:userId,
      userFirstName: user.firstName,
      userLastName: user.lastName,
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

export const getPostsByGroup = async (req, res) => {
  try {
      const { groupId } = req.params;
      const posts = await Post.find({ group: groupId }); // assuming you have group field in Post model
      res.json(posts);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({user: userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};