import { Schema, model, models } from 'mongoose';

const postSchema = new Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    date: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    pictureURL: {
        type: String,
        required: true,
    }
});

const Post = models.Post || model('Post', postSchema);

export default Post;