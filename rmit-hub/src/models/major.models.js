import mongoose, {model, models, Schema} from "mongoose";

const majorSchema = new mongoose.Schema({
    name: {
        type: String
    },
    course_id: [
        {
            type: Schema.Types.ObjectId,
            ref: "Course"
        }
    ]

})

const Major = models.Major || model('Major', majorSchema);
export default Major
