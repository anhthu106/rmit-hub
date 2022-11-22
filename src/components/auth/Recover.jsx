import {useState} from "react";
import Button from "../button/Button";
import {addItems} from "../../backend/helper/items/items";

const Recover = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);


    return (
        <form>
            <div>
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                >
                    Your email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="ID@rmit.edu.vn"
                    required
                    value={email}
                    onChange={({target}) => setEmail(target.value)}
                />
            </div>
            <Button
                fn={(e) => addItems({email}, e, setMessage, "/api/auth/recover")}
                options={"Recover"}
            />
            <div>
                {message}
            </div>
        </form>
    )
}

export default Recover;