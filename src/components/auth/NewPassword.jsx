import { useState } from "react";
import Button from "../button/Button";
import { addItems } from "../../backend/helper/items/items";
import { validPassword } from "../regularexpression/Regex";
import { useEffect } from "react";
import { signIn } from "next-auth/react";

const Repass = ({ email }) => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [retypePassword, setRetypePassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [passwordPass, setPasswordPass] = useState(false);
  const [passwordFail, setPasswordFail] = useState(false);
  const [formCompelete, setFormCompelete] = useState(false);
  const [formUncompelete, setFormUncompelete] = useState(true);

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

  return (
    <>
      <section className="bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-300 via-indigo-400 to-indigo-500 grid h-screen">
        <span></span>
        <div className="opacity-[1] flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-min lg:py-0 z-10 rounded-[50px] drop-shadow-2xl md:mt-0 sm:max-w-screen xl:p-0 ">
          <div className="w-full md:mt-0 sm:max-w-md xl:p-0">
            <div className="align-middle md:align-top w-full">
              <div className="bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-500 via-red-500 to-yellow-500 rounded-t-[50px] h-fit p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl">
                  {email}
                </h1>
                <h2 className="text-xl leading-tight tracking-tight text-gray-900">
                  Type in new password
                </h2>
              </div>
              <div className="bg-white rounded-b-[50px] pt-0">
                <form className="px-6 pb-6 space-y-4 md:space-y-6 sm:px-8 sm:pb-8 pt-8">
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
                    {passwordCheck && (
                      <p className="mt-2 text-xs text-red-600">
                        Minimum eight characters, at least one uppercase letter,
                        one lowercase letter and one number.
                      </p>
                    )}
                  </div>
                  <div class="mb-3 font-light text-gray-500 dark:text-gray-400">
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
                  {formUncompelete && (
                    <button
                      type="button"
                      class="w-full text-white bg-blue-400  cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      disabled
                    >
                      Reset Password
                    </button>
                  )}
                  {formCompelete && (
                    <Button
                      fn={(e) =>
                        addItems(
                          { password },
                          e,
                          setMessage,
                          `/api/auth/reset/${email}`
                        )
                      }
                      options={"Reset Password"}
                    />
                  )}

                  <div className="mt-2 text-lg text-green-600 text-center">
                    {message}
                  </div>
                  <p className="text-sm font-light text-gray-500 ">
                    Return to&nbsp;
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
      </section>
    </>
  );
};

export default Repass;
