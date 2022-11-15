import { model, models, Schema, Types } from "mongoose";

const majorSchema = new Schema({
    name: {
        type: String
    },
    course_id: [
        {
            type: Types.ObjectId,
            ref: "Course"
        }
    ]
})

const Major = models.Major || model('Major', majorSchema);
export default Major
