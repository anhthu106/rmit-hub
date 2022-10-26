import { Schema, model, models } from 'mongoose';

const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true,
    }
});

const Course = models.Course || model('Course', courseSchema);

export default Course;