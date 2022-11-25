import { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { util } from "../../utils/utils";
import { addItems } from "../../backend/helper/items/items";
import Button from "../button/Button";
// import Footer from "../footer/Footer";
import { validPassword } from "../regularexpression/Regex";
import { signIn } from "next-auth/react";
import Header from "../header/Header";
const SignUp = ({ majorProps }) => {
  const animatedComponents = makeAnimated();
  const campusOptions = util.campus();
  const majorOptions = util.item(majorProps, "name");
  // console.log(majorProps);
  const animated = makeAnimated();
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

  const emailIsOK = false;
  const passwordIsOK = false;

  const [emailIsUsed, setEmailIsUsed] = useState(false);
  const [usernameIsUsed, setUsernameIsUsed] = useState(false);
  const [accountIsCreated, setAccountIsCreated] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  useEffect(() => {
    checkEmail();
    checkPassword();
    checkForm();
    accountCreateCheck();
  });

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

  return (
    <>
      <section
        className="
          md:bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-300 via-indigo-400 to-indigo-500
          grid h-screen sm:max-w-full"
      >
        <Header></Header>
        <div className="opacity-[1] flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-min lg:py-0 z-10 rounded-[50px] drop-shadow-2xl md:mt-0 sm:max-w-screen xl:p-0">
          <div className="w-max md:mt-0 sm:max-w-full xl:p-0">
            <div className="align-middle md:align-top">
              <div className="bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-500 via-red-500 to-yellow-500 rounded-t-[50px] h-fit py-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl text-center">
                  First Time Here?
                </h1>
                <h2 className="text-xl leading-tight tracking-tight text-gray-900 text-center">
                  Create an account
                </h2>
              </div>
              <div className="bg-white rounded-b-[50px] pt-0">
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
                          { username, email, password, campus, major },
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
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        <span>
          {showModal ? (
            <>
              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div
                  className="fixed inset-0 w-full h-full bg-black opacity-40"
                  // onClick={() => setShowModal(false)}
                ></div>
                <div className="flex items-center min-h-screen px-4 py-8">
                  <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                    <div className="relative p-4 w-full max-w-lg h-full md:h-auto">
                      <div className="mb-4 text-lg font-light text-gray-500">
                        <h3 className="mb-3 text-2xl font-bold text-green-600">
                          Account Successfully Created
                        </h3>
                        <p>Verify email is sent which have 5 minutes expires</p>
                      </div>
                      <div className="justify-between items-center pt-0 space-y-4 sm:flex sm:space-y-0">
                        <span></span>
                        <div className="items-center space-y-4 sm:space-x-4 sm:flex sm:space-y-0">
                          <a href="../">
                            <button
                              type="button"
                              className="py-2 px-4 w-full text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-auto hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                              Confirm
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </span>
      </section>
    </>
  );
};

export default SignUp;
