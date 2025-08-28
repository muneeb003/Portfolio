import User from "../Models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    if (bcrypt.compareSync(password, user.password)) {
      const token = generateToken();
      res.status(200).json({ message: "Login Successful", token, user });
    } else {
      res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const register = async (req, res) => {
  try {
    const { name, userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({ message: "User Already exists" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(password, salt);
    const newUser = await new User({ name, userName, password: hashedPass });
    await newUser.save();
    res.status(201).json({ message: "User Created", newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
