import Users from "../../models/user.models";
import connectDB from "../../lib/connectDB";

export async function getProfileById(id){
    await connectDB()
    return Users.findById(id, "username email campus major").lean()
}
export async function getUserId(){
    await connectDB()
    const user =  Users.find({})
    console.log(user)
    return user._id
}
