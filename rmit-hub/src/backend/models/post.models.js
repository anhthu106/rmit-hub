import { Schema, model, models } from 'mongoose';

const postSchema = new Schema({
    userID: {
        type: String,
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