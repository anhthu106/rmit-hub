import Header from "../../components/header/Header";
import { useState } from "react";
import SignUpForm from "../../components/auth/SignUpForm";
import { Button } from "../../components/button/Button";

const SignUp = ({ majorProps }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section
        className="
          bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-300 via-indigo-400 to-indigo-500
          grid min-h-fit sm:h-[60rem] sm:max-w-full"
      >
        {/*Header*/}
        <Header></Header>

        {/*Body*/}
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
                <SignUpForm majorProps={majorProps} />
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
                          <a href="../../components">
                            <Button
                              type="button"
                              style="py-2 px-4 w-full text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-auto hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300"
                              options={"Confirm"}
                            />
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
