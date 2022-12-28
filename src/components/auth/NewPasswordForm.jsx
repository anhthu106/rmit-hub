import {useEffect, useState} from "react";
import {validPassword} from "../regularexpression/Regex";
import {addItems} from "../../backend/helper/items/items";
import {signIn} from "next-auth/react";
import {Button, DisabledButton} from "../button/Button";

const NewPasswordForm = ({email}) => {
    //UseState
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [retypePassword, setRetypePassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState(false);
    const [passwordPass, setPasswordPass] = useState(false);
    const [passwordFail, setPasswordFail] = useState(false);
    const [formCompelete, setFormCompelete] = useState(false);
    const [formUncompelete, setFormUncompelete] = useState(true);

    //Function
    function checkPassword() {
        if (password === "") {
            setPasswordCheck(false);
        } else if (!validPassword.test(password)) {
            setPasswordCheck(true);
        } else {
            setPasswordCheck(false);
            comparePasswords();
        }
    }

    function comparePasswords() {
        if (retypePassword === "") {
            setPasswordFail(false);
            setPasswordPass(false);
            setFormCompelete(false);
            setFormUncompelete(true);
        } else if (retypePassword !== password) {
            setPasswordFail(true);
            setPasswordPass(false);
            setFormCompelete(false);
            setFormUncompelete(true);
        } else if (retypePassword === password) {
            setPasswordFail(false);
            setPasswordPass(true);
            setFormCompelete(true);
            setFormUncompelete(false);
        }
    }

    useEffect(() => {
        checkPassword();
    });

    return (<form className="px-6 pb-6 space-y-4 md:space-y-6 sm:px-8 sm:pb-8 pt-8">
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
                autoComplete={"on"}
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {passwordCheck && (<p className="mt-2 text-xs text-red-600">
                Minimum eight characters, at least one uppercase letter, one
                lowercase letter and one number.
            </p>)}
        </div>
        <div className="mb-3 font-light text-gray-500 dark:text-gray-400">
            <label
                htmlFor="retypePassword"
                className="block mb-2 text-sm font-medium text-gray-900 "
            >
                Retype Your Password
            </label>
            <input
                name="retypePassword"
                type="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
                autoComplete={"on"}
                placeholder="Confirm your password"
                value={retypePassword}
                onChange={(e) => setRetypePassword(e.target.value)}
            />
            {passwordFail && (<p className="mt-2 text-xs text-red-600">
                Your passwords do not match, please try again
            </p>)}
            {passwordPass && (<p className="mt-2 text-xs text-green-600">Passwords match</p>)}
        </div>
        {formUncompelete && (<DisabledButton
            type="button"
            style="w-full text-white bg-blue-400  cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            options={"Reset Password"}
        />)}
        {formCompelete && (<Button
            type="button"
            style="w-full  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-white text-center"
            fn={(e) =>
                addItems({password}, e, setMessage, `/api/auth/reset/${email}`)
            }
            options={"Reset Password"}
        />)}

        <div className="mt-2 text-lg text-green-600 text-center">{message}</div>
        <p className="text-sm font-light text-gray-500 ">
            Return to&nbsp;
            <a className="text-sm font-light text-gray-500 ">
                <Button
                    type="button"
                    style="font-medium text-primary-600 hover:underline"
                    fn={() => signIn()}
                    options={"Sign in"}
                />
                ;
            </a>
        </p>
    </form>);
};

export default NewPasswordForm;
