import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import dynamic from "next/dynamic";
import {Button} from "../button/Button";

const EditList = dynamic(() => import("./list/EditList"));
const Task = dynamic(() => import("./task/Task"));
const TaskCard = dynamic(() => import("./task/TaskCard"));
const Hamburger = dynamic(() => import("../hamburger/Hamburger"));
const DropDownHamburger = dynamic(() =>
    import("../hamburger/DropDown.Hamburger")
);
const CreateList = dynamic(() => import("./list/CreateList"));

let socket;

export default function Board({listProps, usernameProps, TeamInfo}) {
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
            const sourceColumn = columns.find(
                (data) => data._id === source.droppableId
            );
            const destColumn = columns.find(
                (data) => data._id === destination.droppableId
            );

            const sourceItems = [...sourceColumn.task_id];
            const destItems = [...destColumn.task_id];

            const [removed] = sourceItems.splice(source.index, 1);

            destItems.splice(destination.index, 0, removed);

            sourceColumn.task_id = sourceItems;
            destColumn.task_id = destItems;
        } else {
            // Move task at the same column

            const column = columns.find((data) => data._id === source.droppableId);

            const copiedItems = [...column.task_id];

            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);

            column.task_id = copiedItems;
        }
        //Call the socket from client side and pass to server side
        socket = io();

        // Pass lists
        socket.emit("List", columns);

        //Create JSON for update to database
        const update = columns.map((data) => {
            const id = data.task_id.map((doc) => {
                return doc._id;
            });
            return {
                _id: data._id,
                task_id: id,
            };
        });
        socket.emit("MongoUpdate", update);
    };

    useEffect(() => {
        socket = io();

        socket.on("MoveList", (list) => {
            // Receive from socket
            setColumns(list);
        });
    }, []);
    return (
        <div className="flex pt-6 overflow-auto h-full ">
            {/* <div className="flex-auto w-96"></div> */}

            {/*Container of drag function as container of lists*/}
            <DragDropContext
                onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
            >
                {columns.map((column) => {
                    return (
                        /* task container*/
                        <div
                            className="flex flex-col items-center max-h-[calc(88vh)] pt-5 mx-3 bg-gray-100 rounded-2xl"
                            key={column._id}
                        >
                            {/*List top container*/}
                            <div
                                className="relative border-solid border-2 border-gray-400 rounded-lg content-center align-middle ">
                                <div className="p-3">
                                    {/*Inline edit List*/}
                                    <EditList listId={column._id} listTile={column.title}/>
                                </div>
                                {/*List hamburger*/}
                                <div className="absolute top-0 right-0 flex w-5 h-5 mt-5 mr-5 tooltip">
                                    <Hamburger/> {/*Hamburger button*/}
                                    <div
                                        className="flex flex-col border-gray-500 border-2 p-4 bg-white w-max h-max rounded-md z-20 absolute right-0 invisible tooltip-item border-solid">
                                        {/* TODO fix */}
                                        <Task
                                            usernameProps={usernameProps}
                                            listID={column._id}
                                            task={""}
                                            tag3={
                                                <>
                                                    <DropDownHamburger /*Hamburger dropdown*/
                                                        tag={
                                                            <svg
                                                                className="w-6 h-6"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        }
                                                        nameTag={"Create Task"}
                                                    />
                                                </>
                                            }
                                        />
                                        <hr/>
                                        <DropDownHamburger
                                            tag={
                                                <svg
                                                    className="w-6 h-6"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                            }
                                            buttonFnc={(e) => {
                                                const data = column._id;

                                                socket = io();
                                                socket.emit("deleteList", data);
                                                e.preventDefault();
                                            }}
                                            nameTag={"Delete List"}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/*Task items*/}
                            <div className="m-5 overflow-y-auto min-h-[50vh]">
                                <Droppable droppableId={column._id} key={column._id}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                key={column._id}
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={{
                                                    /*TODO change style to tailwind*/
                                                    background: snapshot.isDraggingOver
                                                        ? "#f3f4f6"
                                                        : "transparent",
                                                }}
                                                className="h-full w-64 rounded-lg"
                                            >
                                                {/*Fetch items*/}
                                                {column.task_id.map((task, index) => {
                                                    return (
                                                        <div key={task._id}>
                                                            <Draggable
                                                                key={task._id}
                                                                draggableId={task._id}
                                                                index={index}
                                                            >
                                                                {(provided, snapshot) => {
                                                                    return (
                                                                        <div
                                                                            key={column._id}
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            className="flex flex-col pb-2 overflow-auto"
                                                                        >
                                                                            <TaskCard
                                                                                task={task}
                                                                                listID={column._id}
                                                                                usernameProps={usernameProps}
                                                                                tag1={
                                                                                    <Button
                                                                                        type="button"
                                                                                        style="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium w-full  px-4 py-2 inline-flex space-x-1 items-center justify-center"
                                                                                        options={
                                                                                            <>
                                                <span>
                                                  <svg
                                                      className="w-4 h-4"
                                                      fill="none"
                                                      stroke="currentColor"
                                                      viewBox="0 0 24 24"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                    />
                                                  </svg>
                                                </span>
                                                                                                <span>Edit</span>
                                                                                            </>
                                                                                        }
                                                                                    />
                                                                                }
                                                                                tag2={
                                                                                    <Button
                                                                                        type="button"
                                                                                        style="text-slate-800 hover:text-red-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg w-6/12 font-medium px-4 py-2 inline-flex space-x-1 items-center justify-center"
                                                                                        fn={(e) => {
                                                                                            const data = task._id;

                                                                                            socket = io();
                                                                                            socket.emit("deleteTask", data);
                                                                                            e.preventDefault();
                                                                                        }}
                                                                                        options={
                                                                                            <>
                                                <span>
                                                  <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                      strokeWidth="1.5"
                                                      stroke="currentColor"
                                                      className="w-4 h-4"
                                                  >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                    />
                                                  </svg>
                                                </span>
                                                                                                <span>Delete</span>
                                                                                            </>
                                                                                        }
                                                                                    />
                                                                                }
                                                                            />
                                                                        </div>
                                                                    );
                                                                }}
                                                            </Draggable>
                                                        </div>
                                                    );
                                                })}
                                                <br/>
                                                {provided.placeholder}
                                            </div>
                                        );
                                    }}
                                </Droppable>
                            </div>
                        </div>
                    );
                })}
                <CreateList teamID={TeamInfo._id}/>
            </DragDropContext>
        </div>
    );
}
