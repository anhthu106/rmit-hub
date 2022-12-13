export default function NonTeamMember({TeamInfo}) {
    console.log(TeamInfo)
    return (
        // TODO Display all team information and joining function
        <div>
            {/*Team name*/}
            <div>{TeamInfo.name}</div>
            {/*    Team Description*/}
            <div>{TeamInfo.description}</div>

            {/*    Team Course*/}
            <div>{TeamInfo.course}</div>

            {/*    Team Member*/}
            {TeamInfo.user.map((member) => (
                <div>{member}</div>
            ))}
        </div>
    )
}