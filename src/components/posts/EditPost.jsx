import makeAnimated from "react-select/animated";
import { useState } from "react";
import Select from "react-select";
import { util } from "../../utils/utils";
import { updateItems } from "../../backend/helper/items/items";

export default function EditPost({ preCourse, preContent, uid, id, courseProps }) {
    const animated = makeAnimated();
    const courseOptions = util.item(courseProps, "name");

    const [newContent, setNewContent] = useState(preContent);
    const [newCourse, setNewCourse] = useState(preCourse);
    const [newImage, setNewImage] = useState();
    const [message, setMessage] = useState(null);

    function imageHandler(e) {
        const file = e.target.files[0];
        setFileToBase(file);
    }

    const setFileToBase = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setNewImage(reader.result)
        }
    }

    return (
        <>
            <div className="fixed inset-0 z-10 overflow-y-auto">
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
                                            <div className="pb-4 md:pb-6">
                                                <label
                                                    htmlFor="course"
                                                    className="block mb-2 text-2xl font-medium text-gray-900 "
                                                >
                                                    Course
                                                </label>
                                                <Select
                                                    onChange={(course) => setNewCourse(course.label)}
                                                    closeMenuOnSelect={false}
                                                    components={animated}
                                                    placeholder={preCourse}
                                                    options={courseOptions}
                                                />
                                            </div>

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
                                                    className="font-semibold leading-none block mb-2 text-2xl text-gray-900 ">
                                                    Image
                                                </label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    name="image"
                                                    onChange={(e) => imageHandler(e)}
                                                />
                                            </div>

                                            <p className="ml-auto text-xs text-gray-500 ">
                                                Remember, contributions to this topic should follow
                                                our
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
                                        <button
                                            type="submit"
                                            className="w-full mt-2 p-2.5 flex-1 text-white bg-blue-700 rounded-md outline-none ring-offset-2 ring-blue-700 focus:ring-2"
                                            onClick={(e) => {
                                                updateItems(
                                                    { newCourse, newContent, newImage, message, uid, id },
                                                    e,
                                                    setMessage,
                                                    `/api/posts/${id}`
                                                );
                                            }}
                                        >
                                            Update Post
                                        </button>
                                    </div>
                                </form>
                                <div className="items-center gap-2 mt-3 sm:flex"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}
