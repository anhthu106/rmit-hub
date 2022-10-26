import {StatusCodes} from "http-status-codes";
import connectDB from "../../../lib/connectDB";
import Teams from "../../../models/team.models";
import * as courses from '../../../../../data/courses.json';
import Course from "../../../models/course.models";
import Major from "../../../models/major.models";


export default async function handler(req, res) {
    try {
        await connectDB()
        switch (req.method) {
            case "POST": {

                await Teams.create(req.body)
                res.status(StatusCodes.CREATED).json({message: "Team created"})
            }
            case "GET": {

            }
        }


    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: error})
    }

}