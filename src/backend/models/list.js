import { Schema, model, models, Types } from 'mongoose';

const listSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    team_id: {
        type: Types.ObjectId,
        ref: "Team"
    },
    task_id: [
        {
            type: Types.ObjectId,
            ref: "Task",
        }
    ],
});

const List = models.List || model('List', listSchema);

export default List;