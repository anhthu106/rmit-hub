import {model, models, Schema, Types} from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please provide name'],
        unique: [true, "This username already exists"]
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
        type: Types.ObjectId,
        ref: "Major"
    },
    course_id: [
        {
            type: Types.ObjectId,
            ref: "Course"
        }
    ],
    team_id: [
        {
            type: Types.ObjectId,
            ref: "Team",
            default: null
        }
    ],
    post_id: [
        {
            type: Types.ObjectId,
            ref: "Post"
        }
    ],
    image: {
        imgPublicID: {
            type: String,
        },
        imgURL: {
            type: String,
            required: true,
            default: "https://res.cloudinary.com/dxga3vikf/image/upload/v1672323779/image/defaultimg_thf4qq.jpg"
        }
    }
})

userSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})


const Users = models.User || model('User', userSchema);

export default Users;