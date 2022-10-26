import { Schema, model, models } from 'mongoose';

const taskSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true,
    },
    createdDate: {
        type: String,
        required: true,
    },
    deadline: {
        type: String,
        required: true,
    }
});

const Task = models.Task || model('Task', taskSchema);

export default Task;