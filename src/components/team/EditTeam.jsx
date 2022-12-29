import makeAnimated from "react-select/animated";
import {useState} from "react";
import {updateItems} from "../../backend/helper/items/items";
import {Button} from "../button/Button";

// TODO làm edit team
export default function EditTeam({
                                     preName,
                                     preDescription,
                                     id,
                                 }) {
    const animated = makeAnimated();

    const [newName, setName] = useState(preName);
    const [newDescription, setDescription] = useState(preDescription);

    const [message, setMessage] = useState(null);

    return (
        <div>
            <form>
                <div>
                    <label htmlFor="newName">Team name</label>
                    <input
                        type="text"
                        id="newName"
                        name="newName"
                        value={newName}
                        placeholder={preName}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="newDescription">Description</label>
                    <textarea
                        type="text"
                        id="newDescription"
                        name="newDescription"
                        value={preDescription}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <Button
                    type="button"
                    style=""
                    fn={(e) =>
                        updateItems(
                            {
                                newName,
                                newDescription,
                            },
                            e,
                            setMessage,
                            `/api/team/${id}`
                        )
                    }
                    options={"Update Team"}
                />
            </form>
            <div>{message}</div>
        </div>
    );
}
