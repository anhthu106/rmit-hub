export default function TeamInformation({Name, User, CourseId, Member, Description}) {
    return (
        <div>
            <div>{Name}</div>
            <ul>
                {User.map((id) => (
                    <li key={id}>{id}</li>
                ))}
            </ul>
            <div>{CourseId}</div>
            <div>{Member}</div>
            <div>{Description}</div>
        </div>
    )
}