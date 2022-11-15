import {Schema, model, models, Types} from 'mongoose';

const taskSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    user_id: [
        {
            type: Types.ObjectId,
            ref: "User",
        }
    ],
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