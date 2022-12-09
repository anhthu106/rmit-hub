import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import CreateTask from "./CreateTask";

let socket;

export default function Board({ listProps, usernameProps }) {
  const [columns, setColumns] = useState(listProps);

  /**
   * Function run when the Drag done
   * @param result: JSON
   * @param columns: JSON
   */
  const onDragEnd = (result, columns) => {
    if (!result.destination) return;

    const { source, destination } = result;

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
    <>
      <div className="flex flex-row space-x-5 justify-center">
        {/*Container of drag function as container of lists*/}
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {/*Create task container*/}
          {columns.map((column) => {
            return (
              <>
                <div
                //   style={{                    /*TODO change style to tailwind*/ display: "flex",
                //   flexDirection: "column",
                //   alignItems: "center",}}
                  key={column._id}
                  className="flex flex-row px-10 mt-4 space-x-6"
                >
                  {/*Name of the list*/}
                  {/* <div className="bg-blue w-full px-8 py-3">
                    <div className="w-64 p-2">
                      <div className="flex justify-between py-1">
                        <h2 className="">{column.title}</h2>
                        <svg
                          className="h-4 fill-current text-grey-dark cursor-pointer"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" />
                        </svg>
                      </div>
                    </div>
                  </div> */}
                  <div className="flex flex-col flex-shrink-0 w-72">
                    <div>
                      <CreateTask
                        usernameProps={usernameProps}
                        listID={column._id}
                        listName={column.title}
                      />
                      <Droppable droppableId={column._id} key={column._id}>
                        {(provided, snapshot) => {
                          return (
                            <>
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                  /*TODO change style to tailwind*/
                                  background: snapshot.isDraggingOver
                                    ? "lightgrey"
                                    : "white",
                                }}
                                className="p-3 w-full h-fit rounded-b-lg "
                              >
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
                                          <>
                                            <div
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              style={{
                                                /*TODO change style to tailwind*/
                                                userSelect: "none",

                                                ...provided.draggableProps
                                                  .style,
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
                                          </>
                                        );
                                      }}
                                    </Draggable>
                                  );
                                })}
                                {provided.placeholder}
                              </div>
                            </>
                          );
                        }}
                      </Droppable>
                    </div>
                  </div>
                  {/*List items*/}
                </div>

                {/* <div className="flex flex-grow px-10 mt-4 space-x-6">
                  <div className="flex flex-col flex-shrink-0 w-72">
                    <div className="flex items-center flex-shrink-0 h-10 px-2">
                      <span className="block text-sm font-semibold">Doing</span>
                      <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
                        2
                      </span>
                      <button className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div className="flex flex-col pb-2">
                      <div
                        className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
                        draggable="true"
                      >
                        <button className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex">
                          <svg
                            className="w-4 h-4 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>
                        <span className="flex items-center h-6 px-3 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full">
                          Design
                        </span>
                        <h4 className="mt-3 text-sm font-medium">
                          This is the title of the card for the thing that needs
                          to be done.
                        </h4>
                        <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
                          <div className="flex items-center">
                            <svg
                              className="w-4 h-4 text-gray-300 fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clip-rule="evenodd"
                              />
                            </svg>
                            <span className="ml-1 leading-none">Dec 12</span>
                          </div>
                          <div className="relative flex items-center ml-4">
                            <svg
                              className="relative w-4 h-4 text-gray-300 fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                                clip-rule="evenodd"
                              />
                            </svg>
                            <span className="ml-1 leading-none">4</span>
                          </div>
                          <div className="flex items-center ml-4">
                            <svg
                              className="w-4 h-4 text-gray-300 fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                clip-rule="evenodd"
                              />
                            </svg>
                            <span className="ml-1 leading-none">1</span>
                          </div>
                          <div className="w-6 h-6 ml-auto rounded-full">AVA</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </>
            );
          })}
        </DragDropContext>
      </div>
    </>
  );
}
