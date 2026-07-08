import mongoose from 'mongoose'
import dns from 'dns'
dns.setServers(["0.0.0.0", "8.8.8.8"])
export const connectDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
    console.log(`MONGODB Connected Successfully`.bgGreen)
    } catch (error) {
        console.log(error)
    }
}