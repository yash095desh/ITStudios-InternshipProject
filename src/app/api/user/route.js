import { connectToDb } from "@/utils/connectToDb"
import { User } from "@/utils/modals/User";
import { NextResponse } from "next/server";

export const POST = async(req) =>{
    const {name,email,phoneNumber,hobbies} = await req.json();
    const hobbiesArray = hobbies.split(",")
    try {
        connectToDb();
        const user = await User.create({name,email,phoneNumber,hobbies:hobbiesArray});
        return NextResponse.json(user)
    } catch (error) {
        console.log(error)
        if(error?.code == 11000) return NextResponse.json({error:error.message},{status:409})
        return NextResponse.json({error:error.message},{status:400})
    }
}
export const GET =async()=>{
    try {
        connectToDb()
        const users = await User.find({})
        return NextResponse.json(users) 
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:error.message},{status:400})
    }
}
export const PUT = async(req)=>{
    const {name,email,phoneNumber,hobbies} = await req.json();
    const hobbiesArray = hobbies.split(",")
    try {
        connectToDb();
        const user = await User.findOneAndUpdate({email},{name,email,phoneNumber,hobbies:hobbiesArray});
        return NextResponse.json(user)
    } catch (error) {
        console.log(error)
        if(error?.code == 11000) return NextResponse.json({error:error.message},{status:409})
        return NextResponse.json({error:error.message},{status:400})
    }
}
export const DELETE = async(req)=>{
    try {
        connectToDb()
        const url = new URL(req.url)
        const _id = url.searchParams.get('id')
        const user = await User.deleteOne({_id})
        return NextResponse.json(user)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:error.message},{status:400})
    }
}