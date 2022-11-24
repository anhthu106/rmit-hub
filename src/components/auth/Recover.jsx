import { useEffect, useState } from "react";
import Button from "../button/Button";
import { addItems } from "../../backend/helper/items/items";

const Recover = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [messagePass, setMessagePass] = useState(false);
  const [messageFail, setMessageFail] = useState(false);

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
    <>
      <section className="bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-300 via-indigo-400 to-indigo-500 grid h-screen">
        <span></span>
        <div className="opacity-[1] flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-min lg:py-0 z-10 rounded-[50px] drop-shadow-2xl md:mt-0 sm:max-w-screen xl:p-0 ">
          <div className="w-full md:mt-0 sm:max-w-md xl:p-0">
            <div className="align-middle md:align-top w-full">
              <div className="bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-500 via-red-500 to-yellow-500 rounded-t-[50px] h-fit p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl">
                  Find Your Account
                </h1>
                <h2 className="text-xl leading-tight tracking-tight text-gray-900">
                  Please enter your email address to search for your account.
                </h2>
              </div>
              <div className="bg-white rounded-b-[50px] pt-0">
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Recover;
