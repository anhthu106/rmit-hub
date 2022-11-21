import { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { util } from "../../utils/utils";
import { addItems } from "../../backend/helper/items/items";
import Button from "../button/Button";
import Footer from "../footer/Footer";
import { validPassword } from "../regularexpression/Regex";
import {signIn} from "next-auth/react";

const SignUp = ({ majorProps }) => {
  const animatedComponents = makeAnimated();
  const campusOptions = util.campus();
  const majorOptions = util.major(majorProps);

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

  useEffect(() => {
    checkEmail();
    checkPassword();
    checkForm();
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
      <section className="bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-rose-400 via-fuchsia-500 to-white grid">
        <span className="">
          <img
            className="scale-[0.8] z-0 absolute -left-[-50px] -top-[500px]"
            src="data:image/svg+xml;base64,PCEtLT94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/LS0+CiAgICAgICAgICAgICAgPHN2ZyBpZD0ic3ctanMtYmxvYi1zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSI+CiAgICAgICAgICAgICAgICAgICAgPGRlZnM+IAogICAgICAgICAgICAgICAgICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9InN3LWdyYWRpZW50IiB4MT0iMCIgeDI9IjEiIHkxPSIxIiB5Mj0iMCI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3RvcCBpZD0ic3RvcDEiIHN0b3AtY29sb3I9InJnYmEoMjE1LjIyNywgMjE1LjIyNywgMjE1LjIyNywgMC44NSkiIG9mZnNldD0iMCUiPjwvc3RvcD4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdG9wIGlkPSJzdG9wMiIgc3RvcC1jb2xvcj0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjc0KSIgb2Zmc2V0PSIxMDAlIj48L3N0b3A+CiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICAgICAgICAgICAgICAgICAgPC9kZWZzPgogICAgICAgICAgICAgICAgPHBhdGggZmlsbD0idXJsKCNzdy1ncmFkaWVudCkiIGQ9Ik0yNS4xLC0yMC42QzMwLjksLTEyLjgsMzIuOSwtMi40LDMwLjcsNi45QzI4LjQsMTYuMiwyMi4xLDI0LjQsMTIuNywzMC40QzMuNCwzNi41LC05LDQwLjMsLTE3LjgsMzYuM0MtMjYuNiwzMi4zLC0zMS44LDIwLjQsLTM0LjcsNy45Qy0zNy42LC00LjYsLTM4LC0xNy42LC0zMS44LC0yNS41Qy0yNS42LC0zMy40LC0xMi44LC0zNi4zLC0xLjYsLTM1QzkuNywtMzMuNywxOS4zLC0yOC40LDI1LjEsLTIwLjZaIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1MCA1MCkiIHN0cm9rZS13aWR0aD0iMCIgc3R5bGU9InRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2UgMHM7IiBzdHJva2U9InVybCgjc3ctZ3JhZGllbnQpIj48L3BhdGg+CiAgICAgICAgICAgICAgPC9zdmc+"
          />
        </span>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-full md:h-screen lg:py-0 z-10 ">
          <div className="w-full md:mt-0 sm:max-w-md xl:p- absolute top-[50px]]">
            <div className=" space-y-4 md:space-y-6   align-middle md:align-top">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl text-center">
                First Time Here?
              </h1>
              <h2 className="text-xl leading-tight tracking-tight text-gray-900 text-center">
                Create an account
              </h2>
              <form className="px-6 pb-6 space-y-4 md:space-y-6 sm:px-8 sm:pb-8">
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
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
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
                      Minimum eight characters, at least one uppercase letter,
                      one lowercase letter and one number.
                    </p>
                  )}
                </div>

                <div>
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

                <div>
                  <label
                    htmlFor="campus"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Campus
                  </label>
                  <Select
                    onChange={(campus) => setCampus(campus.value)}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    defaultValue={[campusOptions[0]]}
                    options={campusOptions}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  />
                </div>
                <div>
                  <label
                    htmlFor="major"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Major
                  </label>
                  <Select
                    onChange={(major) => setMajor(major.label)}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    defaultValue={[majorOptions[0]]}
                    options={majorOptions}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  />
                </div>

                {formUncompelete && (
                  <button
                    type="button"
                    class="w-full text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    disabled
                  >
                    Register
                  </button>
                )}
                {formCompelete && (
                  <Button
                    fn={(e) =>
                      addItems(
                        { username, email, password, campus, major },
                        e,
                        setMessage,
                        "/api/auth/register"
                      )
                    }
                    options={"Register"}
                  />
                )}

                <div>{message}</div>
                <p className="text-sm font-light text-gray-500 ">
                  Already have an account yet? &nbsp;
                  <a href="#" className="text-sm font-light text-gray-500 ">
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
        <span className="z-20">
          <Footer></Footer>
        </span>
      </section>
    </>
  );
};

export default SignUp;
