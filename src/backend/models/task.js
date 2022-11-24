import { Schema, model, models, Types } from 'mongoose';

const taskSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    username: [
        {
            type: String,
        }
    ],
    list_id: {
        type: Types.ObjectId,
        ref: "List",
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