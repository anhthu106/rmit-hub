import {useState} from "react"
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import {util} from "../../utils/utils";
import {addItems} from "../../backend/helper/Items/Items";
import Button from "../button/Button";

const SignUp = ({majorProps}) => {
    const animatedComponents = makeAnimated();

    const campusOptions = util.campus()
    const majorOptions = util.major(majorProps)

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [campus, setCampus] = useState(campusOptions[0].label)
    const [major, setMajor] = useState(majorOptions[0].label)

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
                <Button
                    fn={(e) =>
                        addItems({username, email, password, campus, major}, e, setMessage, "/api/auth/register")}
                    options={"Register"}
                />
                <div>{message}</div>
            </form>
        </div>
    )
}

export default SignUp