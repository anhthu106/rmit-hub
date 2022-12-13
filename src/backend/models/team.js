import { model, models, Schema, Types } from 'mongoose';


const teamSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    userID: [{
        type: Types.ObjectId,
        ref: "Users",
        validate: { validator: membersLimit, message: "Out of range" },
        default: 0
    }],
    courseID: {
        type: Types.ObjectId,
        ref: "Course",
        required: [true, "courseID is required"]
    },
    listID: [{
        type: Types.ObjectId,
        ref: "List",
    }],
    Member: {
        type: Number,
        default: 0,
    },
    Description: {
        type: String,
    },
    pending: [{
        type: Types.ObjectId,
        ref: "Users",
        default: 0
    }]
});

teamSchema.pre("save", function (next) {
    const member = this.userID.length
    this.set("Member", member) || this.update("Member", member);
    next()
})


function membersLimit() {
    return this.userID.length <= 4
}


const Teams = models.Teams || model('Teams', teamSchema);

export default Teams;