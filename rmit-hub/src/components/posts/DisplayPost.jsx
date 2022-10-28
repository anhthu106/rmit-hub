export default function DisplayPost({ date, content, course }) {
    return (
        <div>
            <div>{course}</div>
            <div>{content}</div>
        </div>
    )
}