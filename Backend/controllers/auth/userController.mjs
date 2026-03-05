import userSchema from "../../models/userSchema.mjs";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    
    // Check existing user
    const userExist = await userSchema.findOne({email})
    if (userExist) return res.status(400).json({ message: "User already exists"})
    
    // Hash Password (encrypt)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await userSchema.create({ name, email, password:hashedPassword })
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
}

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userSchema.findOne({email})
    if (!user) return res.status(400).json({ message: "invalid credentials! (email)"})
    
    // decrypt hash password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: "invalid credentials! (password)"})

    // Creating token with name
    const token = jwt.sign(
      { 
        id: user._id,
        role: user.role,
        name: user.name
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )
    res.status(201).json({token})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}