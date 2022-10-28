import makeAnimated from "react-select/animated";
import { useState, useEffect } from "react";
import Select from "react-select";
import addPost from "../../backend/helper/posts/posts";
import { util } from "../../utils/utils";

export default function CreatePost() {
    const animated = makeAnimated();
    const courseOptions = util.course()

    const [content, setContent] = useState()
    const [course, setCourse] = useState()
    const [message, setMessage] = useState(null)

    let dateFormat = new Date().toLocaleString('default', { month: 'long', day: '2-digit', year: 'numeric' })

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
                <button onClick={(e) => addPost({ content, course, dateFormat }, e, setMessage)}>
                    Create Post
                </button>
            </form>
            <div>{message}</div>
        </div>

    )
}
