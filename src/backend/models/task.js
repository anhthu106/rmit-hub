import {model, models, Schema, Types} from 'mongoose';

const taskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
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
    deadline: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const Task = models.Task || model('Task', taskSchema);

export default Task;