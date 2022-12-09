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
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      {/*Container of drag function as container of lists*/}
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {/*Create task container*/}
        {columns.map((column) => {
          return (
            <div
              style={{
                /*TODO change style to tailwind*/ display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              key={column._id}
            >
              {/*Name of the list*/}

              {/*List items*/}
              <div style={{ margin: 8 }}>
                <Droppable droppableId={column._id} key={column._id}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          /*TODO change style to tailwind*/
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500,
                        }}
                      >
                        <CreateTask
                          usernameProps={usernameProps}
                          listID={column._id}
                          listName={column.title}
                        />

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
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        /*TODO change style to tailwind*/
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#263B4A"
                                          : "#456C86",
                                        color: "white",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      {/*Name of task*/}
                                      {task.description}
                                      
                                      {/*<button*/}
                                      {/*    onClick={(e) => deleteItems({}, e, `/api/workspace/task/${task._id}`)}>*/}
                                      {/*    Delete Task*/}
                                      {/*</button>*/}
                                      <button
                                        onClick={(e) => {
                                          const data = task._id;

                                          socket = io();
                                          socket.emit("deleteTask", data);
                                          e.preventDefault();
                                        }}
                                      >
                                        Delete Task
                                      </button>
                                    </div>
                                  );
                                }}
                              </Draggable>

                              <div class="flex flex-col pb-2 overflow-auto">
                                <div
                                  class="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
                                  draggable="true"
                                >
                                  <button class="absolute top-0 right-0 flex items-center justify-cente w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex">
                                    <svg
                                      class="w-4 h-4 fill-current"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                    </svg>
                                  </button>
                                  <span class="flex items-center h-6 px-3 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full">
                                    Design
                                  </span>
                                  <h4 class="mt-3 text-sm font-medium">
                                  {task.description}
                                  </h4>
                                  <div class="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
                                    <div class="flex items-center">
                                      <svg
                                        class="w-4 h-4 text-gray-300 fill-current"
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
                                      <span class="ml-1 leading-none">
                                      {task.deadline}
                                      </span>
                                    </div>
                                    <div class="w-6 h-6 ml-auto rounded-full">LOL</div>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}

                        <br />
                        <button
                          onClick={(e) => {
                            const data = column._id;

                            socket = io();
                            socket.emit("deleteList", data);
                            e.preventDefault();
                          }}
                        >
                          Delete List
                        </button>
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
