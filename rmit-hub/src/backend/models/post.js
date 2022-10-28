import { Schema, model, models } from 'mongoose';

const postSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    courseID: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    pictureURL: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Post = models.Post || model('Post', postSchema);

export default Post;