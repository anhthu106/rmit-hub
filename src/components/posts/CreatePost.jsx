import makeAnimated from "react-select/animated";
import { useState } from "react";
import Select from "react-select";
import { util } from "../../utils/utils";
import { addItems } from "../../backend/helper/items/items";

export default function CreatePost({ courseProps, id }) {
    const animated = makeAnimated();
    const courseOptions = util.course(courseProps)

    const [content, setContent] = useState()
    const [course, setCourse] = useState()
    const [message, setMessage] = useState(null)

    const d = new Date()
    const currentDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()
    return (
        <div>
            <form>
                <div>
                    <label htmlFor="course">Course</label>
                    <Select
                        onChange={(course) => setCourse(course.label)}
                        closeMenuOnSelect={false}
                        components={animated}
                        placeholder={course}
                        options={courseOptions}
                    />
                </div>

                <div>
                    <label htmlFor="content">Content</label>
                    <textarea
                        type="text"
                        id="content"
                        name="content"
                        required
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                </div>
                <button onClick={(e) => addItems({ currentDate, content, course, id }, e, setMessage, "/api/posts")}>
                    Create Post
                </button>
            </form>
            <div>{message}</div>
        </div>

    )
}
