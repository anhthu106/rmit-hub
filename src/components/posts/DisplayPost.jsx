import { useState } from "react";
import { deleteItems } from "../../backend/helper/Items/Items";

export default function DisplayPost({ author, date, content, course, id }) {
    const [message, setMessage] = useState(null)
    return (
        <div>
            <div>{author}</div>
            <div>{course}</div>
            <div>{content}</div>
            <div>{date}</div>
            <button onClick={(e) => deleteItems({ author, date, content, course }, e, setMessage, `/api/posts/${id}`)}>
                Delete Post
            </button>
        </div>
    )
}