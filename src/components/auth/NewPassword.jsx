import {useState} from "react";
import Button from "../button/Button";
import {addItems} from "../../backend/helper/items/items";

const Repass = ({email}) => {
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);

    return (
        <form>
            <div>
                <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                >
                    New Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <Button
                fn={(e) => addItems({password}, e, setMessage, `/api/auth/reset/${email}`)}
                options={"Reset Password"}
            />
            <div>
                {message}
            </div>
        </form>
    )
}

export default Repass;