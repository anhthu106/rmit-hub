// import makeAnimated from "react-select/animated";
// import * as courses from "../../../../data/courses.json";
// import { useState } from "react";
// import Select from "react-select";
// import { take } from "../../backend/helper/users/users";

// export default function CreatePost({ PreUsername, PreMajor, id }) {
//     const animated = makeAnimated();

//     const UpdateCourse = Object.keys(courses)
//     const majorOptions = []

//     for (let i = 0; i < UpdateCourse.length - 1; i++) {
//         let UpdateCourseDict = {}
//         UpdateCourseDict['value'] = UpdateCourse[i]
//         UpdateCourseDict['label'] = UpdateCourse[i]
//         majorOptions.push(UpdateCourseDict)
//     }

//     const [username, setUsername] = useState(PreUsername)
//     const [campus, setCampus] = useState(PreCampus)
//     const [major, setMajor] = useState(PreMajor)

//     const [message, setMessage] = useState(null)
//     return (
//         <div>
//             <form>
//                 <div>
//                     <label htmlFor="username">Username</label>
//                     <input
//                         type="text"
//                         id="username"
//                         name="username"
//                         required
//                         value={username}
//                         placeholder={PreUsername}
//                         onChange={e => setUsername(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="campus">Campus</label>
//                     <Select
//                         onChange={(campus) => setCampus(campus.label)}
//                         closeMenuOnSelect={false}
//                         components={animated}
//                         placeholder={PreCampus}
//                         options={campusOptions}
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="major">Major</label>
//                     <Select
//                         onChange={(major) => setMajor(major.label)}
//                         closeMenuOnSelect={false}
//                         components={animated}
//                         placeholder={PreMajor}
//                         options={majorOptions}
//                     />
//                 </div>
//                 <button onClick={(e) => take.UpdateUserInformation({ username, campus, major }, id, e, setMessage)}>
//                     Update
//                 </button>
//             </form>
//             <div>{message}</div>
//         </div>

//     )
// }
