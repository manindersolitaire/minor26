import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'

// LOGIN
export const loginController =  async(req,res)=>{
    try {
        let {email , password} = req.body

    // validation
    if(!email || !password){
        return res.status(400).send({
            message  :"Fill all fields",
            success :  false
        })
    }

    // existing user
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(400).send({
            success : false,
            message : 'User not registered'
        })
    }
    let isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        return res.status(400).send({
            success : false,
            message : "Invaild username or password"
        })
    }
    return res.status(200).send({
        success : true,
        message : "Login Successfully",
        user
    })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success : false,
            message : 'Error in login Controller',
            error
        })
    }

}
// REGISTER
export const registerController =  async(req,res)=>{
    try {
        let {username, email , password} = req.body

    // validation
    if(!username || !email || !password){
        return res.status(400).send({
            message  :"Fill all fields",
            success :  false
        })
    }

    // existing user
    const existingUser = await userModel.findOne({email})
    if(existingUser){
        return res.status(400).send({
            success : false,
            message : 'User Already Exist'
        })
    }
    let hashedPassword = await bcrypt.hash(password, 10)
    password = hashedPassword

    // Save New User
    const user = await userModel({username, email , password : hashedPassword})
    await user.save()
    return res.status(201).send({
        success : true,
        message : 'New User Created',
        user
    })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success : false,
            message : 'Error in Register Controller',
            error
        })
    }

}
// GET ALL USERS
export const getAllUsers = async(req,res)=>{
    try {
        const users = await userModel.find({})
        return res.status(200).send({
            userCount : users.length,
            success : true,
            message : "All Users",
            users
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success : false,
            message : 'Error in get user Controller',
            error
        })
    }
}


