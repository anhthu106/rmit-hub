import { useEffect, useState } from "react";
import Button from "../button/Button";
import { addItems } from "../../backend/helper/items/items";

const RecoverForm = () => {
    //UseState
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);
    const [messagePass, setMessagePass] = useState(false);
    const [messageFail, setMessageFail] = useState(false);

    //Function
    function MessageCheck() {
        if (message !== null) {
            if (message.toLowerCase().includes("verify")) {
                setMessagePass(true);
                setMessageFail(false);
                console.log("Pass");
            }
            if (message.toLowerCase().includes("invalid")) {
                setMessagePass(false);
                setMessageFail(true);
                console.log("Fail");
            }
        }
    }

    useEffect(() => {
        MessageCheck();
    });

    return (
        <form className="px-6 pb-6 space-y-4 md:space-y-6 sm:px-8 sm:pb-8 pt-8">
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
                    onChange={({ target }) => setEmail(target.value)}
                />
            </div>
            <Button
                fn={(e) =>
                    addItems({ email }, e, setMessage, "/api/auth/recover")
                }
                options={"Recover"}
            />
            {messageFail && (
                <p className="text-xs text-red-600">{message}</p>
            )}
            {messagePass && (
                <p className="mt-2 text-xs text-green-600">{message}</p>
            )}
        </form>
    )
}

export default RecoverForm;