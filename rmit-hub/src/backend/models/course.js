import {Schema, model, models} from 'mongoose';

const courseSchema = new Schema({
    name: {
        type: String,
    },
    major_id: [{
        type: Schema.Types.ObjectId,
        ref: "Major",
    }],
    user_id: [
        {
            type: Schema.Types.ObjectId,
            ref:"User"
        }
    ]
});

const Course = models.Course || model('Course', courseSchema);

export default Course;