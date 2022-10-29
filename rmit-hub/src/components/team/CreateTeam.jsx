import makeAnimated from "react-select/animated";
import { useState } from "react";
import Select from "react-select";
import { user } from "../../backend/helper/users/users";
import { util } from "../../utils/utils";
import {addItems} from "../../backend/helper/Items/Items";

export default function CreateTeam({courseProps  }) {

    const animated = makeAnimated();
    const courseOptions = util.course(courseProps)


    const [teamName, setTeamName] = useState()
    const [course, setCourse] = useState()
    const [description, setDescription] = useState()

    const [message, setMessage] = useState(null)
    return (
        <div>
            <form>
                <div>
                    <label htmlFor="teamName">Team name</label>
                    <input
                        type="text"
                        id="teamName"
                        name="teamName"
                        required
                        value={teamName}
                        onChange={e => setTeamName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="course">Course</label>
                    <Select
                        onChange={(course) => setCourse(course.label)}
                        closeMenuOnSelect={false}
                        components={animated}
                        placeholder={course}
                        options={courseOptions}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        type="text"
                        id="description"
                        name="description"
                        required
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <button onClick={(e) => addItems({ teamName, course, description }, id, e, setMessage)}>
                    Create Team
                </button>
            </form>
            <div>{message}</div>
        </div>

    )
}
