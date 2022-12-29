import {useEffect, useState} from "react";
import {Button, DisabledButton} from "../button/Button";
import {addItems} from "../../backend/helper/items/items";

const RecoverForm = () => {
    //UseState
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);
    const [messagePass, setMessagePass] = useState(false);
    const [messageFail, setMessageFail] = useState(false);

    const [formCompelete, setFormCompelete] = useState(false);
    const [formUncompelete, setFormUncompelete] = useState(false);

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
            if (message === "Verify email is sent which have 5 minutes expires") {
                setMessage(message)
                setFormCompelete(false);
                setFormUncompelete(true);
                setTimeout(() => {
                    setMessage("Send again, if you did not received email")
                }, 60000)
            }
        }
    }

    useEffect(() => {
        MessageCheck();
    });

    return (
        <form className="px-6 pb-6 space-y-4 md:space-y-6 sm:px-8 sm:pb-8 pt-8"
              onSubmit={(e) => addItems({email}, e, setMessage, "/api/auth/recover")}>
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

            {formUncompelete && (
                <DisabledButton
                    type="button"
                    style="w-full text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    options={"Recover"}
                />
            )}
            {formCompelete && (
                <Button
                    type="button"
                    style="w-full  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-white text-center"
                    fn={(e) => addItems({email}, e, setMessage, "/api/auth/recover")}
                    options={"Recover"}
                />
            )}
            {messageFail && <p className="text-xs text-red-600">{message}</p>}
            {messagePass && <p className="mt-2 text-xs text-green-600">{message}</p>}
        </form>
    );
};

export default RecoverForm;
