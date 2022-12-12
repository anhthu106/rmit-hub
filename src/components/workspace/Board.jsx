import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import CreateTask from "./task/CreateTask";
import EditList from "./list/EditList";

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
    <div className="flex  overflow-auto h-full">
      {/* <div className="flex-auto w-96"></div> */}

      {/*Container of drag function as container of lists*/}
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {/*Create task container*/}
        {columns.map((column) => {
          return (
            <div
              className="flex flex-col items-center max-h-[calc(88vh)] pt-5"
              key={column._id}
            >
              {/*Name of the list*/}
              <div className="relative flex flex-col items-start flex-shrink-0 h-10 py-8 px-4 border-solid border-2 border-white rounded-lg content-center align-middle">
                <EditList listId={column._id} listTile={column.title} />
                {/* <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
          2
        </span> */}
                <div className="absolute top-0 right-0 flex w-5 h-5 mt-5 mr-5 tooltip ">
                  <div className="hover:text-gray-400 px-2 py-1 font-medium">
                    <svg
                      className="w-4 h-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </div>
                  <div className="flex flex-col p-4 bg-white w-max h-max rounded-md z-20 absolute right-0 invisible tooltip-item border-solid border-2 border-gray-300 ">
                    <ul className="list-disc space-y-2 ">
                      <CreateTask
                        usernameProps={usernameProps}
                        listID={column._id}
                      />
                    </ul>
                    <hr />
                    {/* <ul className="list-disc space-y-2">
                                <EditList
                                  listId={column._id}
                                  listTile={column.title}
                                />
                              </ul> */}
                    <hr />
                    <ul>
                      <button
                        type="button"
                        className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                        onClick={(e) => {
                          const data = column._id;

                          socket = io();
                          socket.emit("deleteList", data);
                          e.preventDefault();
                        }}
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="flex-1 ml-3 text-left whitespace-nowrap">
                          Delete List
                        </span>
                      </button>
                    </ul>
                  </div>
                </div>
              </div>
              {/*List items*/}
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
                            ? "lightgrey"
                            : "transparent",
                        }}
                        className="h-fit w-64 rounded-lg mt-3"
                      >
                        {/*Fetch items*/}
                        {column.task_id.map((task, index) => {
                          return (
                            <>
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
                                      <div className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100">
                                        <div className="absolute top-0 right-0 flex w-5 h-5 mt-5 mr-5 tooltip">
                                          <div className="hover:text-gray-400 px-2 py-1 font-medium">
                                            <svg
                                              className="w-4 h-4 fill-current"
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 20 20"
                                              fill="currentColor"
                                            >
                                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                            </svg>
                                          </div>
                                          <div className="flex flex-col p-4 bg-white w-max h-max rounded-md z-20 absolute right-0 invisible tooltip-item border-solid">
                                            <ul className="list-disc space-y-2">
                                              <li className="flex items-start">
                                                <button
                                                  onClick={(e) => {
                                                    const data = task._id;

                                                    socket = io();
                                                    socket.emit(
                                                      "deleteTask",
                                                      data
                                                    );
                                                    e.preventDefault();
                                                  }}
                                                >
                                                  Delete Task
                                                </button>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <span className="flex items-center h-6 px-3 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full">
                                          Design
                                        </span>
                                        <h4 className="mt-3 text-sm font-medium">
                                          {task.description}
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
                                                fillRule="evenodd"
                                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                clipRule="evenodd"
                                              />
                                            </svg>
                                            <span className="ml-1 leading-none">
                                              {task.deadline}
                                            </span>
                                          </div>
                                          <div className="w-6 h-6 ml-auto rounded-full">
                                            LOL
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            </>
                          );
                        })}

                        <br />

                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}
