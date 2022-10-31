import makeAnimated from "react-select/animated";
import {useState} from "react";
import Select from "react-select";
import {util} from "../../utils/utils";
import {updateItems} from "../../backend/helper/Items/Items";

export default function EditTeam({preName, preCourse, preDescription, courseProps, id}) {

    const animated = makeAnimated();
    const courseOptions = util.course(courseProps)


    const [newName, setName] = useState(preName)
    const [newCourse, setCourse] = useState(preCourse)
    const [newDescription, setDescription] = useState(preDescription)

    const [message, setMessage] = useState(null)

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
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="newCourse">Course</label>
                    <Select
                        onChange={(course) => setCourse(course.label)}
                        closeMenuOnSelect={false}
                        components={animated}
                        placeholder={preCourse}
                        options={courseOptions}
                    />
                </div>
                <div>
                    <label htmlFor="newDescription">Description</label>
                    <textarea
                        type="text"
                        id="newDescription"
                        name="newDescription"
                        value={preDescription}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <button onClick={(e) => updateItems({
                    newName, newCourse, newDescription
                }, e, setMessage, `/api/team/${id}`)}>
                    Update Team
                </button>
            </form>
            <div>{message}</div>
        </div>

    )
}
