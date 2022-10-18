import Users from "../../models/user.models";
import connectDB from "../../lib/connectDB";


export default async function handle(req, res){
    // await connectDB()
    const {id} = req.query
    console.log(id)
    // const user =  await Users.findById({id}).populate("password")
    // console.log(user)
}