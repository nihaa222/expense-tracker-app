
import express from "express"
import User from "../models/user.model.js"

const generateToken = (user) => {
    return jwt.sign(
        {id: user._id, role: user.role},
        process.env.JWT_SECRET,
     
    )
}

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body; // ❌ no role

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      // ✅ role is automatically set to "employee" in model
    });

    const token = generateToken(user);
    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during signup", error: error.message });
  }
};



export const signin = async(req, res) => {
try {
const {email, password} = req.body
    const user = await User.findOne({email})
    if (user){
        res.status(500).json({message: "The user has to signin first."})
    } 

    const isMatch = await user.matchPassword(password)
    if(!isMatch){
        return res.status(401).json({message: "Invalid credentials"})
    }
    
    const token = generateToken({user})
     res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
}catch(error){
    res.status(500).json({message: "Server error during login,", error: error.message})
}
    
}