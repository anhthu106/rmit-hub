import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import CreateTask from "./CreateTask";

let socket

export default function Board({listProps, usernameProps}) {
    const [columns, setColumns] = useState(listProps);

    /**
     * Function run when the Drag done
     * @param result: JSON
     * @param columns: JSON
     */
    const onDragEnd = (result, columns) => {
        if (!result.destination) return;

        const {source, destination} = result;

        // Move task to different columns condition
        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns.find(data => data._id === source.droppableId);
            const destColumn = columns.find(data => data._id === destination.droppableId);

            const sourceItems = [...sourceColumn.task_id];
            const destItems = [...destColumn.task_id];

            const [removed] = sourceItems.splice(source.index, 1);

            destItems.splice(destination.index, 0, removed);

            sourceColumn.task_id = sourceItems
            destColumn.task_id = destItems

        } else { // Move task at the same column

            const column = columns.find(data => data._id === source.droppableId);

            const copiedItems = [...column.task_id];

            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);

            column.task_id = copiedItems

        }
        //Call the socket from client side and pass to server side
        socket = io()

        // Pass lists
        socket.emit("List", columns)

        //Create JSON for update to database
        const update = columns.map((data) => {
            const id = data.task_id.map((doc) => {
                return doc._id;
            })
            return {
                _id: data._id,
                task_id: id
            }
        })
        socket.emit("MongoUpdate", update)
    };


    useEffect(() => {
        socket = io()

        socket.on("MoveList", list => { // Receive from socket
            setColumns(list)
        })

    }, [])


    return (
        <div style={{display: "flex", justifyContent: "center", height: "100%"}}>
            {/*Container of drag function as container of lists*/}
            <DragDropContext
                onDragEnd={result => onDragEnd(result, columns, setColumns)}
            >
                {/*Create task container*/}
                {columns.map((column) => {
                    return (
                        <div
                            style={{ /*TODO change style to tailwind*/
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }}
                            key={column._id}
                        >
                            {/*Name of the list*/}
                            <h2>{column.title}</h2>


                            {/*List items*/}
                            <div style={{margin: 8}}>
                                <Droppable droppableId={column._id} key={column._id}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={{ /*TODO change style to tailwind*/
                                                    background: snapshot.isDraggingOver
                                                        ? "lightblue"
                                                        : "lightgrey",
                                                    padding: 4,
                                                    width: 250,
                                                    minHeight: 500
                                                }}
                                            >
                                                <CreateTask
                                                    usernameProps={usernameProps}
                                                    listID={column._id}
                                                />

                                                {/*Fetch items*/}
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
                                                                        style={{ /*TODO change style to tailwind*/
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
                                                                        {/*Name of task*/}
                                                                        {task.description}


                                                                        {/*<button*/}
                                                                        {/*    onClick={(e) => deleteItems({}, e, `/api/workspace/task/${task._id}`)}>*/}
                                                                        {/*    Delete Task*/}
                                                                        {/*</button>*/}
                                                                        <button onClick={(e) => {
                                                                            const data = task._id

                                                                            socket = io()
                                                                            socket.emit("deleteTask", data)
                                                                            e.preventDefault()
                                                                        }}>

                                                                            Delete Task
                                                                        </button>
                                                                    </div>
                                                                )
                                                            }}
                                                        </Draggable>
                                                    )
                                                })}
                                                <button onClick={(e) => {
                                                    const data = column._id

                                                    socket = io()
                                                    socket.emit("deleteList", data)
                                                    e.preventDefault()
                                                }}>

                                                    Delete List
                                                </button>
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
    )
}
