import {useState} from "react"
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import * as courses from '../../../../data/courses.json';
import registerUser from "../../backend/helper/auth/registerUser";

const SignUp = ({majorProps}) => {
    const animatedComponents = makeAnimated();

    const majorOptions = []
    for (let i = 0; i < majorProps.length - 1; i++) {
        let courseDict = {}
        courseDict['value'] = majorProps[i].name
        courseDict['label'] = majorProps[i].name
        majorOptions.push(courseDict)
    }

    const campusOptions = [
        {value: 'sgs', label: "Saigon South Campus"},
        {value: 'hn', label: "Hanoi Campus"},
    ]

    let defaultCampus = campusOptions[0]['label']
    let defaultMajor = majorOptions[0]['label']

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [campus, setCampus] = useState(defaultCampus)
    const [major, setMajor] = useState(defaultMajor)

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
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="s1234567@rmit.edu.com" required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="campus">Campus</label>
                    <Select
                        onChange={(campus) => setCampus(campus.value)}
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        defaultValue={[campusOptions[0]]}
                        options={campusOptions}
                    />
                </div>
                <div>
                    <label htmlFor="major">Major</label>
                    <Select
                        onChange={(major) => setMajor(major.label)}
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        defaultValue={[majorOptions[0]]}
                        options={majorOptions}
                    />
                </div>
                <button onClick={(e) => registerUser({username, email, password, campus, major}, e, setMessage)}>
                    Register
                </button>
            </form>
            <div>{message}</div>
        </div>

    )
}

export default SignUp
