import {Button} from "../../components/button/Button";
import {deleteItems} from "../../backend/helper/items/items";

export default function DisplayTeamMembers({userProps, team, url}) {
    return (
        <div>
            {userProps.map((user) => {
                    return (
                        <div key={user._id}>
                            <div>Picture</div>
                            <div>{user.username}</div>
                            <Button
                                type={"button"}
                                options={"Kick"}
                                fn={(e) => {
                                    deleteItems({userID: user._id}, e, `../../api/team/${team.id}`)
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