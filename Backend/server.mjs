import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.mjs'
import quizRoutes from './routes/quizRoutes.mjs'
import userRoutes from './routes/userRoutes.mjs'

const app = express()
app.use(express.json())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))

// MongoDb
connectDB()

// Routes
app.use('/api/quiz', quizRoutes)
app.use('/api/user', userRoutes)
 

// Global Error Handler
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
})