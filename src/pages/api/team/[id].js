import connectDB from "../../../backend/lib/connectDB";
import {StatusCodes} from "http-status-codes";
import Teams from "../../../backend/models/team";
import User from "../../../backend/models/user";
import List from "../../../backend/models/list";
import Task from "../../../backend/models/task";
import Post from "../../../backend/models/post";

export default async function handler(req, res) {
    /**
     * Backend specific team information
     */
    try {
        await connectDB()
        switch (req.method) {
            case "PATCH": {
                try {
                    /**
                     * Update Information
                     */
                    const {
                        query: {id}
                    } = req
                    //Update Team information
                    if (req.body.newName && req.body.newDescription) {

                        const newTeam = {
                            name: req.body.newName, Description: req.body.newDescription
                        }

                        const team = await Teams.findByIdAndUpdate(id, newTeam, {new: true, runValidators: true})
                        if (!team) {
                            new Error.json({message: "Team not found"})
                        }

                        return res.status(StatusCodes.OK).json({message: "Your account updated"})
                    } else if (req.body.userId) { //Update Team members
                        const team = await Teams.findById(id)
                        team.userID.push(req.body.userId)
                        await team.save()
                        return res.status(StatusCodes.OK).json({message: "Welcome"})
                    }
                    break
                } catch (e) {
                    return e;
                }
            }
            case "DELETE": {
                try {
                    /**
                     * Delete User from Team
                     */
                    const {
                        query: {id}
                    } = req

                    if (req.body) {
                        const team = await Teams.findByIdAndUpdate(id, {
                            $pull: {
                                userID: req.body.userID
                            },
                            $inc: {
                                Member: -1
                            }
                        }).populate("listID", "_id", List).populate("postID", "_id", Post)


                        const user = await User.findByIdAndUpdate(req.body.userID, {
                            $pull: {
                                team_id: team._id,
                                post_id: {$in: team.postID}
                            }
                        })

                        team.listID.map(async (listID) => {
                            const list = await List.findById(listID._id.toString())
                            await Task.findByIdAndUpdate(list.task_id.toString(), {
                                $pull: {
                                    username: user.username
                                }
                            })
                        })

                        team.postID.map(async (postID) => {
                            const post = await Post.findById(postID._id.toString())
                            if (post.userID.toString() === req.body.userID) {
                                post.deleteOne();
                            }
                        })

                        res.status(StatusCodes.OK).json(req.body);
                    } else {
                        //Delete main
                        const team = await Teams.findByIdAndDelete(id)

                        //Delete reference
                        await User.findByIdAndUpdate(team.userID, { $pull: { course_id: team.courseID } })
                        await User.findByIdAndUpdate(team.userID, {$pull: {team_id: team._id}})
                        const lists = await List.find({_id: {$in: team.listID}}, "task_id").lean()

                        await List.deleteMany({_id: {$in: team.listID}})

                        lists.map(async (list) => {
                            await Task.deleteMany({_id: {$in: list.task_id}})
                        })

                        await Post.deleteMany({_id: {$in: team.postID}})

                        res.status(StatusCodes.OK).json({message: "Deleted"})

                    }

                } catch (e) {
                    return e
                }
            }
        }
    } catch (Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({Error})
    }

}