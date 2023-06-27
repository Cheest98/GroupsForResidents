import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { addUserToGlobalGroup } from "../controllers/group.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, picturePath, group } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      group,
    });

    const savedUser = await newUser.save();

    await addUserToGlobalGroup(savedUser._id);

    const { password: userPassword, ...userWithoutPassword } = savedUser.toObject();

    res.status(201).json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });

      if (!user) return res.status(400)
      .json({ msg: "User does not exist." });
  
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) return res.status(400)
      .json({ msg: "Invalid credentials." });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: userPassword, ...userWithoutPassword } = user.toObject();

      res.status(200).json({ token, user: userWithoutPassword });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};