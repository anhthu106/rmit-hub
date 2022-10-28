import mongoose, {Schema} from "mongoose";
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
    major_id: {
        type: Schema.Types.ObjectId,
        ref: "Major"
    },
    course_id: [
        {
            type: Schema.Types.ObjectId,
            ref: "Course"
        }
    ],
    team_id: [
        {
            type: Schema.Types.ObjectId,
            ref: "Team",
            default: null
        }
    ],
    post_id: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    task_id: [
        {
            type: Schema.Types.ObjectId,
            ref: "Tasks",
        }
    ]
})

userSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const Users = mongoose.models.User || mongoose.model('User', userSchema);

export default Users;