import makeAnimated from "react-select/animated";
import {useEffect, useState} from "react";
import {updateItems} from "../../backend/helper/items/items";
import Portal from "../portal/Portal";
import {Button} from "../button/Button";

export default function EditPost({
                                     preCourse,
                                     preContent,
                                     uid,
                                     id,
                                     courseProps,
                                 }) {
    const animated = makeAnimated();

    const [newContent, setNewContent] = useState(preContent);
    const [newCourse, setNewCourse] = useState(preCourse);
    const [newImage, setNewImage] = useState();
    const [message, setMessage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [checkFile, setCheckFile] = useState(false);

    function imageHandler(e) {
        const file = e.target.files[0];
        setFileToBase(file);
        setSelectedFile(e.target.files[0]);
        setCheckFile(true);
    }

    function reloadHandler() {
        if (message === "Your post updated") {
            window.setTimeout(function () {
                location.reload();
            }, 300);
        }
    }

    useEffect(() => {
        reloadHandler();
    });

    const setFileToBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setNewImage(reader.result);
        };
    };

    return (
        <>
            <li>
                <Button
                    type="button"
                    style="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    fn={() => setShowModal(true)}
                    options={
                        <>
                            <svg
                                className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/>
                                <path
                                    fillRule="evenodd"
                                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="flex-1 ml-3 text-left whitespace-nowrap">
                Edit Post
              </span>
                        </>
                    }
                />
            </li>
            {showModal ? (
                <>
                    <Portal>
                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div
                                className="fixed inset-0 w-full h-full bg-black opacity-40"
                                onClick={() => setShowModal(false)}
                            ></div>
                            <div className="flex items-center min-h-screen px-4 py-8">
                                <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                                    <div className="mt-3 sm:flex">
                                        <div className="mt-2 text-center sm:ml-4 sm:text-left">
                                            <h1 className="text-xl font-medium leading-tight tracking-tight text-gray-900 md:text-3xl text-center">
                                                Edit Post
                                            </h1>
                                            <form className="w-full pb-6 space-y-4 md:space-y-6 sm:pb-8 pt-8">
                                                <div className="mb-4 border border-gray-200 rounded-lg bg-gray-50">
                                                    <div className="px-4 py-2 bg-white rounded-t-lg">
                                                        <div>
                                                            <label
                                                                htmlFor="content"
                                                                className="font-semibold leading-none block mb-2 text-2xl text-gray-900 "
                                                            >
                                                                Content
                                                            </label>
                                                            <textarea
                                                                type="text"
                                                                id="content"
                                                                name="content"
                                                                required
                                                                value={newContent}
                                                                onChange={(e) => setNewContent(e.target.value)}
                                                                rows="4"
                                                                className="w-full text-lg text-gray-900 bg-white focus:ring-1 resize-none rounded-md border border-gray-300"
                                                                placeholder="Content..."
                                                            />
                                                        </div>

                                                        <div>
                                                            <label
                                                                htmlFor="image"
                                                                className="font-semibold leading-none block mb-2 text-2xl text-gray-900 "
                                                            >
                                                                Image
                                                            </label>
                                                            <input
                                                                className="pb-2"
                                                                type="file"
                                                                accept="image/*"
                                                                name="image"
                                                                onChange={(e) => imageHandler(e)}
                                                            />
                                                            {/* -Image Preview- */}
                                                            {/* <span className="text-[18px] w-56 truncate">
                            {checkFile ? selectedFile.name : "choose a file"}
                          </span> */}

                                                            <img
                                                                className={`h-40 mx-auto py-1 ${
                                                                    checkFile ? "opacity-1" : "opacity-0 hidden"
                                                                }`}
                                                                src={
                                                                    selectedFile
                                                                        ? URL.createObjectURL(selectedFile)
                                                                        : null
                                                                }
                                                            />
                                                        </div>


                                                        <p className="ml-auto text-xs text-gray-500 ">
                                                            Remember, contributions to this topic should
                                                            follow our&nbsp;
                                                            <a
                                                                href="#"
                                                                className="text-blue-600 hover:underline"
                                                            >
                                                                Community Guidelines
                                                            </a>
                                                            .
                                                        </p>
                                                    </div>
                                                    <p className="py-4 text-lg text-green-600 text-center">
                                                        {message}
                                                    </p>
                                                </div>
                                                <div className="items-center gap-2 mt-3 sm:flex">
                                                    <Button
                                                        type="submit"
                                                        style="w-6/12 mt-2 p-2.5 text-white bg-blue-700 font-medium rounded-md text-sm px-5 py-2.5 text-center flex-1 outline-none ring-offset-2 ring-blue-700 focus:ring-2"
                                                        fn={(e) => {
                                                            updateItems(
                                                                {
                                                                    newCourse,
                                                                    newContent,
                                                                    newImage,
                                                                    message,
                                                                    uid,
                                                                    id,
                                                                },
                                                                e,
                                                                setMessage,
                                                                `/api/posts/${id}`
                                                            );

                                                        }}
                                                        options={"Update Post"}
                                                    />
                                                    <Button
                                                        type=""
                                                        style="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                                        fn={() => setShowModal(false)}
                                                        options={"Cancel"}
                                                    />
                                                </div>
                                            </form>
                                            <div className="items-center gap-2 mt-3 sm:flex"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Portal>
                </>
            ) : null}
        </>
    );
}
