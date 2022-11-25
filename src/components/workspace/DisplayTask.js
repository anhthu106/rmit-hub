export default function DisplayTask({description, username, createdDate, deadline}) {
    return (
        <div>
            <div>{description}</div>
            {username.map((doc) => (
                <div key={doc}>
                    <div>{doc}</div>
                </div>
            ))}
            <div>{createdDate}</div>
            <div>{deadline}</div>
        </div>

    )
}