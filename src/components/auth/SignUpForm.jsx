import makeAnimated from "react-select/animated";
import {util} from "../../utils/utils";
import {useEffect, useState} from "react";
import {validPassword} from "../regularexpression/Regex";
import Select from "react-select";
import Button from "../button/Button";
import {addItems} from "../../backend/helper/items/items";
import {signIn} from "next-auth/react";

const SignUpForm = ({majorProps}) => {
    //Use animated of react-select
    const animatedComponents = makeAnimated();

    //Query Course and Major
    const campusOptions = util.campus();
    const majorOptions = util.item(majorProps, "name");

    //UseState
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [campus, setCampus] = useState(campusOptions[0].label);
    const [major, setMajor] = useState(majorOptions[0].label);
    const [message, setMessage] = useState(null);

    const [emailError, setEmailError] = useState(false);

    const [passwordCheck, setPasswordCheck] = useState("");

    const [passwordPass, setPasswordPass] = useState(false);
    const [passwordFail, setPasswordFail] = useState(false);

    const [retypePassword, setRetypePassword] = useState("");

    const [formCompelete, setFormCompelete] = useState(false);
    const [formUncompelete, setFormUncompelete] = useState(false);

    const [emailIsUsed, setEmailIsUsed] = useState(false);
    const [usernameIsUsed, setUsernameIsUsed] = useState(false);
    const [accountIsCreated, setAccountIsCreated] = useState(false);

    //Function
    let emailIsOK = false;
    let passwordIsOK = false;

    function accountCreateCheck() {
        if (message != null) {
            console.log("Error: " + message);
            if (message.toLowerCase().includes("username")) {
                console.log("username lol");
                setUsernameIsUsed(true);
                setEmailIsUsed(false);
                setAccountIsCreated(false);
            }
            if (message.toLowerCase().includes("email")) {
                console.log("email lol");
                setEmailIsUsed(true);
                setUsernameIsUsed(false);
                setAccountIsCreated(false);
            }
            if (message.toLowerCase().includes("account")) {
                console.log("account lol");
                setAccountIsCreated(true);
                setUsernameIsUsed(false);
                setEmailIsUsed(false);
            }
            setMessage(null);
        }
    }

    function checkEmail() {
        if (
            email.length === 20 &&
            email.endsWith("@rmit.edu.vn") &&
            email.startsWith("s", 0)
        ) {
            setEmailError(false);
            emailIsOK = true;
        } else {
            emailIsOK = false;
            if (email === "") {
                setEmailError(false);
            } else {
                setEmailError(true);
            }
        }
    }

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
            passwordIsOK = false;
        } else if (retypePassword !== password) {
            setPasswordFail(true);
            setPasswordPass(false);
            passwordIsOK = false;
        } else if (retypePassword === password) {
            setPasswordFail(false);
            setPasswordPass(true);
            passwordIsOK = true;
        }
    }

    function checkForm() {
        if (
            username !== "" &&
            emailIsOK === true &&
            passwordIsOK === true &&
            campus !== "" &&
            major !== ""
        ) {
            setFormCompelete(true);
            setFormUncompelete(false);
        } else {
            setFormCompelete(false);
            setFormUncompelete(true);
        }
    }

    useEffect(() => {
        checkEmail();
        checkPassword();
        checkForm();
        accountCreateCheck();
    });

    return (
        <form className="px-6 pb-6 space-y-4 md:space-y-6 sm:px-8 sm:pb-8 pt-8">
            {accountIsCreated && (
                <p className="mt-2 text-center text-xs text-red-600">
                    This account is already created
                </p>
            )}
            <div>
                <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                >
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    placeholder="New username"
                    value={username}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    onChange={(e) => setUsername(e.target.value)}
                />
                {usernameIsUsed && (
                    <p className="mt-2 text-xs text-red-600">
                        This username is already used.
                    </p>
                )}
                <span className="mt-2 text-sm text-red-600">{message}</span>
            </div>
            <div>
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                >
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="s1234567@rmit.edu.com"
                    required
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value.toLocaleLowerCase())
                    }
                />
                {emailError && (
                    <p className="mt-2 text-xs text-red-600">
                        Your email should be an RMIT's email (sID@rmit.edu.vn)
                    </p>
                )}
                {emailIsUsed && (
                    <p className="mt-2 text-xs text-red-600">
                        This Email is already used.
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 ">
                <div className="font-light text-gray-500 dark:text-gray-400 w-64">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Password
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
                    {passwordCheck && (
                        <p className="mt-2 text-xs text-red-600">
                            Minimum eight characters, at least one uppercase
                            letter, one lowercase letter and one number.
                        </p>
                    )}
                </div>
                <div className="font-light text-gray-500 dark:text-gray-400 w-64">
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
                        placeholder="Confirm your password"
                        value={retypePassword}
                        onChange={(e) => setRetypePassword(e.target.value)}
                    />
                    {passwordFail && (
                        <p className="mt-2 text-xs text-red-600">
                            Your passwords don't match, please try again
                        </p>
                    )}
                    {passwordPass && (
                        <p className="mt-2 text-xs text-green-600">
                            Passwords match
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className=" font-light text-gray-500 dark:text-gray-400">
                    <label
                        htmlFor="campus"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                        Campus
                    </label>
                    <Select
                        onChange={(campus) => setCampus(campus.value)}
                        closeMenuOnSelect={true}
                        components={animatedComponents}
                        defaultValue={[campusOptions[0]]}
                        options={campusOptions}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 "
                    />
                </div>
                <div className=" font-light text-gray-500 dark:text-gray-400">
                    <label
                        htmlFor="major"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Major
                    </label>
                    <Select
                        onChange={(major) => setMajor(major.label)}
                        closeMenuOnSelect={true}
                        components={animatedComponents}
                        defaultValue={[majorOptions[0]]}
                        options={majorOptions}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 "
                    />
                </div>
            </div>

            {formUncompelete && (
                <button
                    type="button"
                    className="w-full text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    disabled
                >
                    Register
                </button>
            )}
            {formCompelete && (
                <Button
                    fn={(e) => {
                        addItems(
                            {username, email, password, campus, major},
                            e,
                            setMessage,
                            "/api/auth/register"
                        );
                        setShowModal(true);
                    }}
                    options={"Register"}
                />
            )}
            <p className="text-sm font-light text-gray-500 ">
                Already have an account yet? &nbsp;
                <a className="text-sm font-light text-gray-500 ">
                    <button
                        onClick={() => signIn()}
                        className="font-medium text-primary-600 hover:underline"
                    >
                        Sign in
                    </button>
                </a>
            </p>
        </form>
    )
}

export default SignUpForm;