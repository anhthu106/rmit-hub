import {model, models, Schema} from 'mongoose';


const teamSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    userID: [{
        type: Schema.Types.ObjectId,
        ref: "Users",
        validate: {validator: membersLimit, message: "Out of range"},
        default: 0
    }],
    courseID: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: [true, "courseID is required"]
    },
    Member: {
        type: Number,
        default: 0,
    },
    Description: {
        type: String,
    }
});

teamSchema.pre("save", function (next) {
    const member = this.userID.length
    this.set("Member", member)
    next()
})


function membersLimit() {
    return this.userID.length <= 4
}


const Teams = models.Teams || model('Teams', teamSchema);

export default Teams;