import {Button} from "../../components/button/Button";

export default function DisplayTeamMembers({userProps}) {
    return (
        <div>
            {userProps.map((doc) => {
                    return (
                        <div key={doc._id}>
                            <div>Picture</div>
                            <div>{doc.username}</div>
                            <Button
                                type={"button"}
                                options={"Kick"}
                                fn={(e) => {
                                    de
                                }}
                                style={null}
                            />
                        </div>
                    )
                }
            )}
        </div>
    )
}