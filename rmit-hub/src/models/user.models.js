import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    campus: {
        type: String,
        required: true
    },
    major: {
        type: String,
        required: true
    }
});

const Users = models.User || model('User', userSchema);

export default Users;