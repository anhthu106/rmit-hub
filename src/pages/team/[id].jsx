import {useEffect, useState} from "react";
import {DragDropContext, Draggable, Droppable, resetServerContext} from "react-beautiful-dnd";
import connectDB from "../../backend/lib/connectDB";
import Course from "../../backend/models/course";
import Teams from "../../backend/models/team";
import List from "../../backend/models/list";
import Task from "../../backend/models/task";
import importRawData from "../../backend/helper/data/data";
import Users from "../../backend/models/user";
import CreateList from "../../components/workspace/CreateList";
import {io} from "socket.io-client";

let socket

export async function getServerSideProps({params}) {
    await connectDB()

    const courseData = await Course.find({}, "name")
    const teamData = await Teams.findById(params.id)
    const teamCourse = await Course.findById(teamData.courseID.toString(), "name")
    const listData = await List.find({team_id: params.id}, '_id title task_id team_id').populate('task_id', '_id description username createdDate deadline', Task)
    const list = importRawData(listData, ['_id', 'team_id'], null)

    const lists = await Promise.all(
        list.map(async (doc) => {
            doc.task_id.map(async (task) => {
                task._id = task._id.toString()
            })
            return doc;
        })
    )

    const courses = importRawData(courseData, ['_id'], null)

    const userId = teamData.userID.map((data) => {
        return data.toString()
    })

    const userName = await Promise.all(teamData.userID.map(async (data) => {
        data = data.toString()
        const user = await Users.findById(data, "username").lean()
        return user["username"]
    }))

    const TeamInfo = {
        _id: teamData._id.toString(),
        name: teamData.name,
        courseName: teamCourse.name,
        description: teamData.Description,
        members: teamData.Member,
        userId: userId,
        user: userName
    }
    resetServerContext();


    return {
        props: {
            TeamInfo,
            courseProps: courses,
            listProps: lists,
            userName: userName
        }
    }
}

export default function Test({listProps, TeamInfo, courseProps, userName}) {

    const socketInitializer = async () => {
        await fetch("/api/socket");
        socket = io()

        socket.on('connect', () => {
            console.log(`⚡: ${socket.id} user just connected!`);
        })

        socket.on("moveList", list => {
            setColumns(list)
        })
    }

    useEffect(() => {
        socketInitializer()
    })

    const [columns, setColumns] = useState(listProps);


    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;

        const {source, destination} = result;


        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns.find(data => data._id === source.droppableId);
            const destColumn = columns.find(data => data._id === destination.droppableId);

            const sourceItems = [...sourceColumn.task_id];
            const destItems = [...destColumn.task_id];

            const [removed] = sourceItems.splice(source.index, 1);

            destItems.splice(destination.index, 0, removed);

            sourceColumn.task_id = sourceItems
            destColumn.task_id = destItems


        } else {
            const column = columns.find(data => data._id === source.droppableId);
            const copiedItems = [...column.task_id];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            column.task_id = copiedItems

        }
        socket = io()
        socket.emit("Task", columns)
    };

    return (
        <div>
            <CreateList teamID={TeamInfo._id}/>


            <div style={{display: "flex", justifyContent: "center", height: "100%"}}>
                <DragDropContext
                    onDragEnd={result => onDragEnd(result, columns, setColumns)}
                >
                    {columns.map((column) => {
                        return (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center"
                                }}
                                key={column._id}
                            >
                                <h2>{column.title}</h2>
                                <div style={{margin: 8}}>
                                    <Droppable droppableId={column._id} key={column._id}>
                                        {(provided, snapshot) => {
                                            return (
                                                <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    style={{
                                                        background: snapshot.isDraggingOver
                                                            ? "lightblue"
                                                            : "lightgrey",
                                                        padding: 4,
                                                        width: 250,
                                                        minHeight: 500
                                                    }}
                                                >
                                                    {column.task_id.map((task, index) => {
                                                        return (
                                                            <Draggable
                                                                key={task._id}
                                                                draggableId={task._id}
                                                                index={index}
                                                            >
                                                                {(provided, snapshot) => {
                                                                    return (
                                                                        <div
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            style={{
                                                                                userSelect: "none",
                                                                                padding: 16,
                                                                                margin: "0 0 8px 0",
                                                                                minHeight: "50px",
                                                                                backgroundColor: snapshot.isDragging
                                                                                    ? "#263B4A"
                                                                                    : "#456C86",
                                                                                color: "white",
                                                                                ...provided.draggableProps.style
                                                                            }}
                                                                        >
                                                                            {task.description}
                                                                        </div>
                                                                    )
                                                                }}
                                                            </Draggable>
                                                        )
                                                    })}
                                                    {provided.placeholder}
                                                </div>
                                            )
                                        }
                                        }
                                    </Droppable>
                                </div>


                            </div>
                        )
                    })}

                </DragDropContext>
            </div>
        </div>
    )
}
