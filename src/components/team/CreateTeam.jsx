import makeAnimated from "react-select/animated";
import { useState } from "react";
import Select from "react-select";
import { util } from "../../utils/utils";
import { addItems } from "../../backend/helper/items/items";

export default function CreateTeam({ courseProps, OwnerUser }) {

    const animated = makeAnimated();
    const courseOptions = util.item(courseProps, "name")


    const [name, setName] = useState()
    const [course, setCourse] = useState()
    const [description, setDescription] = useState(null)

    const [message, setMessage] = useState(null)
    return (
        <div>
            <form>
                <div>
                    <label htmlFor="name">Team name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
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
                        placeholder={"description"}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <button onClick={(e) => addItems({ name, course, description, userID: OwnerUser }, e, setMessage, "api/team")}>
                    Create Team
                </button>
            </form>
            <div>{message}</div>
        </div>

    )
}
