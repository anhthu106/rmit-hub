import { Schema, model, models, Types } from 'mongoose';

const postSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    courseID: {
        type: Types.ObjectId,
        ref: "Course",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        imgPublicID: {
            type: String,
        },
        imgURL: {
            type: String,
            required: true,
        }
    }
}, {
    timestamps: true,
});

const Post = models.Post || model('Post', postSchema);

export default Post;