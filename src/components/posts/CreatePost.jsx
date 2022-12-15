import makeAnimated from "react-select/animated";
import { useEffect, useState } from "react";
import Select from "react-select";
import { util } from "../../utils/utils";
import { addItems } from "../../backend/helper/items/items";
import Link from "next/link";
import Image from "next/image";

export default function CreatePost({ courseProps, id, Info }) {
  const animated = makeAnimated();
  const courseOptions = util.item(courseProps, "name");

  const [content, setContent] = useState("");
  const [course, setCourse] = useState("");
  const [message, setMessage] = useState(null);
  const [image, setImage] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [formCheck, setFormCheck] = useState(false);
  const [placeHolder, setPlaceHolder] = useState(false);

  function imageHandler(e) {
    const file = e.target.files[0];
    setFileToBase(file);
  }

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  function checkForm() {
    if (content === "" || course === "" || image === null) {
      setFormCheck(false);
    } else {
      setFormCheck(true);
    }
  }

  useEffect(() => {
    checkForm();
  });

  return (
    <div>
      <div className="bg-white border rounded-xl shadow-md drop-shadow-lg m-4">
        <div className=" px-4 py-3 ">
          <div className="flex justify-between">
            <div
              className="flex justify-between items-center w-full"
              key={Info.user._id}
            >
              <Link href={`/users/${Info.user._id}`}>
              <Image
                  key={Info.user.image.imgURL}
                  className="h-12 w-12 rounded-full object-fill cursor-pointer	"
                  src={Info.user.image.imgURL}
                  alt="Avatar"
                  width="50"
                  height="50"
                />
                
              </Link>

              <div className="py-5 px-3 h-full bg-white w-full">
                <button
                  type="button"
                  className="p-3 md:py-3 md:px-5 w-full text-xs sm:text-sm text-gray-900 focus:outline-none bg-gray-100 rounded-full border border-gray-200 hover:bg-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-200"
                  onClick={() => setShowModal(true)}
                >
                  <p className="text-left ">
                    {placeHolder ? (
                      <></>
                    ) : (
                      <span>
                        <span
                          className="md:inline hidden"
                          key={Info.user.username}
                        >
                          Hey {Info.user.username}!&nbsp;
                        </span>
                        Find your teammates now.
                      </span>
                    )}
                    {placeHolder}
                  </p>
                </button>
              </div>
            </div>
          </div>
          <hr />
        </div>

        <div className="font-semibold text-sm mx-4 mt-2 mb-4">
          {/* placeHolder */}
        </div>
      </div>

      {/* <div data-dial-init className="fixed right-6 bottom-6 group z-50">
        <button
          type="button"
          onClick={() => setShowModal(true)}
          data-dial-toggle="speed-dial-menu-square"
          aria-controls="speed-dial-menu-square"
          aria-expanded="false"
          className="flex justify-center items-center w-14 h-14 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none"
        >
          <svg
            aria-hidden="true"
            className="w-8 h-8 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          <span className="sr-only">Open actions menu</span>
        </button>
      </div> */}
      {showModal ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="flex items-center min-h-screen sm:px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3 sm:flex">
                  <div className="mt-2 text-center sm:ml-4 sm:text-left">
                    <h1 className="text-xl font-medium leading-tight tracking-tight text-gray-900 md:text-3xl text-center">
                      Create New Post
                    </h1>
                    <form className="w-full pb-6 space-y-4 md:space-y-6 sm:pb-8 pt-8">
                      <div className="mb-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="px-4 py-2 bg-white rounded-t-lg">
                          <div className="pb-4 md:pb-6">
                            <label
                              htmlFor="course"
                              className="block mb-2 text-left text-xl md:text-2xl font-medium text-gray-900 "
                            >
                              Course
                            </label>
                            <Select
                              onChange={(course) => setCourse(course.label)}
                              closeMenuOnSelect={true}
                              components={animated}
                              placeholder={course}
                              options={courseOptions}
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="content"
                              className="font-semibold leading-none block mb-2 text-left text-xl md:text-2xl text-gray-900 "
                            >
                              Content
                            </label>
                            <textarea
                              type="text"
                              id="content"
                              name="content"
                              required
                              value={content}
                              onChange={(e) => {
                                setContent(e.target.value);
                                setPlaceHolder(content);
                              }}
                              rows="4"
                              className="w-full text-lg text-gray-900 bg-white focus:ring-1 resize-none rounded-md border border-gray-300"
                              placeholder="Content..."
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="image"
                              className="font-semibold leading-none block mb-2 text-left text-xl md:text-2xl text-gray-900 "
                            >
                              Image
                            </label>
                            <input
                              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                              id="file_input"
                              type="file"
                              accept="image/*"
                              name="image"
                              onChange={(e) => imageHandler(e)}
                            />
                          </div>
                          <p className="ml-auto text-xs text-gray-500 pt-3">
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
                        {formCheck ? (
                          <button
                            type="submit"
                            className="w-6/12 mt-2 p-2.5 flex-1 text-white bg-blue-700 rounded-md outline-none ring-offset-2 ring-blue-700 focus:ring-2"
                            onClick={(e) => {
                              addItems(
                                { content, course, message, image, id },
                                e,
                                setMessage,
                                "/api/posts"
                              );
                              setShowModal(false);
                              window.location.reload(false);
                            }}
                          >
                            Create Post
                          </button>
                        ) : (
                          <button
                            className="w-6/12 mt-2 p-2.5 text-white bg-blue-400 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            disabled
                          >
                            Create Post
                          </button>
                        )}

                        <button
                          className="w-6/12 mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                          onClick={() => setShowModal(false)}
                        >
                          Cancel
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
      ) : null}
    </div>
  );
}
