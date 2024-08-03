import mongoose from "mongoose"

 export const connectToDb = async () =>{
    try {
        const db = await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected sucessfully')
    } catch (error) {
        console.log(error)
    }
}