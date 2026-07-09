import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import colors from 'colors'
import { connectDB } from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import blogRoutes from './routes/blogRoutes.js'

import cors from "cors";

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://minor26-nine.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

dotenv.config()
connectDB()
const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req,res)=>{
    res.send('API Worked')
})
// User Routes
app.use('/api/v2/user', userRoutes)
// blog routes
app.use('/api/v2/blog', blogRoutes)

const PORT = process.env.PORT || 1600

app.listen(PORT , ()=>{
    console.log(`Server Running on port ${PORT}`.bgYellow)
})

