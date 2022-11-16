import { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { util } from "../../utils/utils";
import { addItems } from "../../backend/helper/Items/Items";
import Button from "../button/Button";
import Footer from "../footer/Footer";
import Link from "next/link";


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

  return (
    <>
      <section className="bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-rose-400 via-fuchsia-500 to-white grid sm:grid-cols-2">
        <span className=" w-full"></span>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-full md:h-screen lg:py-0 backdrop-blur-3xl bg-white/80 rounded-l-[200px] shadow z-10">
          <div className="w-full md:mt-0 sm:max-w-md xl:p-">
            <div className=" space-y-4 md:space-y-6   align-middle md:align-top">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl text-center">
                Welcome Back!
              </h1>
              <h2 className="text-xl leading-tight tracking-tight text-gray-900 text-center">
                Create your account
              </h2>
              <form className="px-6 pb-6 space-y-4 md:space-y-6 sm:px-8 sm:pb-8">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    value={username}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="s1234567@rmit.edu.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 "
                    htmlFor="campus"
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
                  <label className="block mb-2 text-sm font-medium text-gray-900 "
                    htmlFor="major"
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
                <div>
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
                </div>
                <div>{message}</div>
                <p className="text-sm font-light text-gray-500 ">
                  Already have an account?
                  <Link href="../signin">
                    <a className="font-medium text-primary-600 hover:underline">
                      {" "}
                      Sign up
                    </a>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default SignUp;
