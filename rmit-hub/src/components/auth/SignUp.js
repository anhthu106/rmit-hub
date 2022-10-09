import { useState } from "react"
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import * as courses from '../../../../data/courses.json';

const SignUp = () => {
    const animatedComponents = makeAnimated();

    const course = Object.keys(courses)
    const majorOptions = []

    for (let i = 0; i < course.length - 1; i++) {
        let courseDict = {}
        courseDict['value'] = course[i]
        courseDict['label'] = course[i]
        majorOptions.push(courseDict)
    }

    let campusOptions = [
        { value: 'sgs', label: "Saigon South Campus" },
        { value: 'hn', label: "Hanoi Campus" },
    ]

    let defaultCampus = campusOptions[0]['label']
    let defaultMajor = majorOptions[0]['label']

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [campus, setCampus] = useState(defaultCampus)
    const [major, setMajor] = useState(defaultMajor)

    const [message, setMessage] = useState(null)

    const registerUser = async (username, email, password, campus, major, e) => {
        e.preventDefault()
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password, campus, major }),
        })

        let data = await res.json()
        if (data.message) {
            setMessage(data.name)
        }
        if (data.message == "success") {
            let options = { redirect: false, email, password }
            console.log(options)
            // const res = await signIn("credentials", options)
            // return Router.push("/")
        }
    }

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
                        onChange={(campus) => setCampus(campus)}
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        defaultValue={[campusOptions[0]]}
                        options={campusOptions}
                    />
                </div>
                <div>
                    <label htmlFor="major">Major</label>
                    <Select
                        onChange={(major) => setMajor(major)}
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        defaultValue={[majorOptions[0]]}
                        options={majorOptions}
                    />
                </div>
                <button onClick={(e) => registerUser(username, email, password, campus, major, e)}>
                    Register
                </button>
            </form>
        </div>
    )
}

export default SignUp
