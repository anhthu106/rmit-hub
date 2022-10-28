import makeAnimated from "react-select/animated";
import { useState } from "react";
import Select from "react-select";
import { user } from "../../backend/helper/users/users";
import { util } from "../../utils/utils";

export default function EditProfileForm({ PreUsername, PreCampus, PreMajor, id, majorProps}) {
    const animated = makeAnimated();
    const majorOptions = util.major(majorProps)
    const campusOptions = util.campus()

    const [username, setUsername] = useState(PreUsername)
    const [campus, setCampus] = useState(PreCampus)
    const [major, setMajor] = useState(PreMajor)

    const [message, setMessage] = useState(null)
    return (
        <div>
            <form>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        value={username}
                        placeholder={PreUsername}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="campus">Campus</label>
                    <Select
                        onChange={(campus) => setCampus(campus.label)}
                        closeMenuOnSelect={false}
                        components={animated}
                        placeholder={PreCampus}
                        options={campusOptions}
                    />
                </div>
                <div>
                    <label htmlFor="major">Major</label>
                    <Select
                        onChange={(major) => setMajor(major.label)}
                        closeMenuOnSelect={false}
                        components={animated}
                        placeholder={PreMajor}
                        options={majorOptions}
                    />
                </div>
                <button onClick={(e) => user.UpdateUserInformation({ username, campus, major }, id, e, setMessage)}>
                    Update
                </button>
            </form>
            <div>{message}</div>
        </div>

    )
}
