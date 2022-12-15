import {resetServerContext} from "react-beautiful-dnd";

// BACKEND
import connectDB from "../../../backend/lib/connectDB";
import importRawData from "../../../backend/helper/data/data";

// MODELS
import Course from "../../../backend/models/course";
import Teams from "../../../backend/models/team";
import List from "../../../backend/models/list";
import Task from "../../../backend/models/task";
import Users from "../../../backend/models/user";
import {useSession} from "next-auth/react";
import dynamic from "next/dynamic";


// COMPONENT
const TeamMember = dynamic(() => import("../../../pageComponents/workingplace/TeamMember"));
const NonTeamMember = dynamic(() => import("../../../pageComponents/workingplace/NonTeamMember"));


export async function getServerSideProps({params}) {
    await connectDB();

    const courseData = await Course.find({}, "name");
    const teamData = await Teams.findById(params.id);
    const teamCourse = await Course.findById(
        teamData.courseID.toString(),
        "name"
    );
    const listData = await List.find(
        {team_id: params.id},
        "_id title task_id team_id"
    ).populate("task_id", "_id description username createdDate deadline", Task);
    const list = importRawData(listData, ["_id", "team_id"], null);

    const lists = await Promise.all(
        list.map(async (doc) => {
            doc.task_id.map(async (task) => {
                task._id = task._id.toString();
            });
            return doc;
        })
    );

    const courses = importRawData(courseData, ["_id"], null);

    const userId = teamData.userID.map((data) => {
        return data.toString();
    });

    const userName = await Promise.all(
        teamData.userID.map(async (data) => {
            data = data.toString();
            const user = await Users.findById(data, "username").lean();
            return user["username"];
        })
    );

    const TeamInfo = {
        _id: teamData._id.toString(),
        name: teamData.name,
        courseName: teamCourse.name,
        description: teamData.Description,
        members: teamData.Member,
        userId: userId,
        user: userName,
    };
    resetServerContext();

    return {
        props: {
            TeamInfo,
            courseProps: courses,
            listProps: lists,
            userName: userName,
        },
    };
}

export default function TeamDetail({
                                       listProps,
                                       TeamInfo,
                                       courseProps,
                                       userName,
                                   }) {
    const {data: session} = useSession();
    const currentUser = session.user._id

    if (TeamInfo.userId.includes(session.user._id)) {
        return (
            <div>
                <TeamMember userName={userName} TeamInfo={TeamInfo} listProps={listProps}/>
            </div>
        )
    } else {
        return (
            <div>
                <NonTeamMember TeamInfo={TeamInfo} currentUser={currentUser}/>
            </div>

        )
    }
}
TeamDetail.auth = true;
