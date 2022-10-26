import { Schema, model, models } from 'mongoose';

const teamSchema = new Schema({
    teamStatus: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true,
    },
    courseID: {
        type: String,
        required: true,
    },
    limitMember: {
        type: String,
        required: true,
    }
});

const Teams = models.Teams || model('Teams', teamSchema);

export default Teams;