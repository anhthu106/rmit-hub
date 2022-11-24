import makeAnimated from "react-select/animated";
import { useState } from "react";
import Select from "react-select";
import { util } from "../../utils/utils";
import { addItems } from "../../backend/helper/items/items";

export default function CreatePost({ courseProps, id }) {
  const animated = makeAnimated();
  const courseOptions = util.item(courseProps, "name");

  const [content, setContent] = useState();
  const [course, setCourse] = useState();
  const [message, setMessage] = useState(null);

  const d = new Date();
  const currentDate =
    d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();

  return (
    <div>
      {/* new */}
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
                className="font-semibold leading-none block mb-2 text-2xl text-gray-900 "
              >
                Content
              </label>
              <textarea
                type="text"
                id="content"
                name="content"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="4"
                className="w-full text-lg text-gray-900 bg-white focus:ring-1 resize-none rounded-md border border-gray-300"
                placeholder="Content..."
              />
            </div>
            <p className="ml-auto text-xs text-gray-500 ">
              Remember, contributions to this topic should follow our{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Community Guidelines
              </a>
              .
            </p>
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t ">
            <span>{/* place holder (dont delete) */}</span>
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200hover:bg-blue-800"
              onClick={(e) =>
                addItems(
                  { currentDate, content, course, id },
                  e,
                  setMessage,
                  "/api/posts"
                )
              }
            >
              Create Post
            </button>
            {/* <div className="flex pl-0 space-x-1 sm:pl-2">
            </div> */}
          </div>
          <p className="py-4 text-lg text-green-600 text-center">{message}</p>
        </div>
      </form>
      
    </div>
  );
}
