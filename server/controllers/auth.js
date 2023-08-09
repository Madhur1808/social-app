import bcrypt from "bcrypt";
import { jwt } from "jsonwebtoken";
import User from "../models/User.js";

//Register user
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

//login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).send({ msg: "User does not exists" });

    const checkpass = await bcrypt.compare(password, user.password);
    if (!checkpass) return res.status(400).send({ msg: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    delete user.password;
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
