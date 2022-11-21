import { useState } from "react";
import { deleteItems } from "../../backend/helper/items/items";

export default function DisplayPost({ author, date, content, course, id, sessionName, username }) {
    const [message, setMessage] = useState(null)
    if (sessionName === username) {
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
    return (
        <div>
            <div>{author}</div>
            <div>{course}</div>
            <div>{content}</div>
            <div>{date}</div>
        </div>
    )
}