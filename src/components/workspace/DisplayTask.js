export default function DisplayTask({ description, username, createdDate, deadline }) {
    return (
        <div>
            <div>This is the Task list: </div>
            <div>{description}</div>
            <div>{username}</div>
            <div>{createdDate}</div>
            <div>{deadline}</div>
        </div>

    )
}