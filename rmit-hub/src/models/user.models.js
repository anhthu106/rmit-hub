import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide name']
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: [true, "This email already exists"]
    },
    password: {
        type: String,
        required: [true, 'Please provide password']
    },
    campus: {
        type: String,
        required: [true, 'Please provide campus']
    },
    major: {
        type: String,
        required: [true, 'Please provide major']
    }
})

userSchema.pre("save", async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const Users = mongoose.models.User || mongoose.model('User', userSchema);

export default Users;