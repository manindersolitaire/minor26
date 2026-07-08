import express from 'express'
import { getAllUsers, loginController, registerController } from '../controllers/userController.js'

const userRoutes = express.Router()

userRoutes.post('/register', registerController)
userRoutes.post('/login', loginController)
userRoutes.get('/allUsers', getAllUsers)

export default userRoutes