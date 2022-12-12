import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import EditList from "./list/EditList";
import Task from "./task/Task";
import TaskCard from "./task/TaskCard";
import Hamburger from "../hamburger/Hamburger";
import DropDownHamburger from "../hamburger/DropDown.Hamburger";

let socket;

export default function Board({ listProps, usernameProps, TeamInfo }) {
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
        {columns.map((column) => {
          return (
            /* task container*/
            <div
              className="flex flex-col items-center max-h-[calc(88vh)] pt-5 mx-3 bg-gray-200 rounded-2xl"
              key={column._id}
            >
              {/*List top container*/}
              <div className="relative flex flex-col items-start flex-shrink-0 h-10 py-8 px-4 border-solid border-2 border-white rounded-lg content-center align-middle">
                {/*Inline edit List*/}
                <EditList listId={column._id} listTile={column.title} />

                {/*List hamburger*/}
                <div className="absolute top-0 right-0 flex w-5 h-5 mt-5 mr-5 tooltip ">
                  <Hamburger /> {/*Hamburger button*/}
                  <div className="flex flex-col p-4 bg-white w-max h-max rounded-md z-20 absolute right-0 invisible tooltip-item border-solid">
                    <DropDownHamburger /*Hamburger dropdown*/
                      tag={
                        <>
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
                          <Task
                            usernameProps={usernameProps}
                            listID={column._id}
                            task={""}
                          />
                        </>
                      }
                      nameTag={"Create Task"}
                    />
                    <DropDownHamburger
                      tag={
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
                                      <TaskCard task={task} />
                                      <Task
                                        task={task}
                                        listID={column._id}
                                        usernameProps={usernameProps}
                                      />
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
