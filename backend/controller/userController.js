import bcrypt from "bcryptjs";
import User from "../model/user.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res
        .status(500)
        .json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "This email id is already registered",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.log("error in registering user", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "User logged in successfully",
      });
  } catch (error) {
    console.log("error in logging user", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ success: true, message: "User log out successfully" });
  } catch (error) {
    console.log("error in logging out ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
