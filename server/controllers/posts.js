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

    // Get all posts in the same group
    const postsInGroup = await Post.find({ group: user.group });
    
    res.status(201).json(postsInGroup);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getPosts = async (req, res) => {
  try {
      const { groupId } = req.params;
      const posts = await Post.find({ group: groupId });
      res.json(posts);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};
