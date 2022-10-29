import makeAnimated from "react-select/animated";
import {useState} from "react";
import Select from "react-select";
import {util} from "../../utils/utils";
import {addItems} from "../../backend/helper/Items/Items";

export default function CreatePost({courseProps}) {
    const animated = makeAnimated();
    const courseOptions = util.course(courseProps)

    const [content, setContent] = useState()
    const [course, setCourse] = useState()
    const [message, setMessage] = useState(null)

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
                <button onClick={(e) => addItems({content, course}, e, setMessage, "/api/auth/posts")}>
                    Create Post
                </button>
            </form>
            <div>{message}</div>
        </div>

    )
}
