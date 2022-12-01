import makeAnimated from "react-select/animated";
import { useState } from "react";
import Select from "react-select";
import { util } from "../../utils/utils";
import { updateItems } from "../../backend/helper/items/items";

export default function EditProfileForm({
  PreUsername,
  PreCampus,
  PreMajor,
  id,
  majorProps,
}) {
  const animated = makeAnimated();
  const majorOptions = util.item(majorProps, "name");
  const campusOptions = util.campus();

  const [username, setUsername] = useState(PreUsername);
  const [campus, setCampus] = useState(PreCampus);
  const [major, setMajor] = useState(PreMajor);

  const [message, setMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center w-full"
        >
            Edit
        </button>
      </div>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-2  sm:ml-4 sm:text-left">
                  <h1 className="text-xl font-medium leading-tight tracking-tight text-gray-900 md:text-3xl text-center">
                    Edit Profile
                  </h1>
                  <form className="w-full pb-6 space-y-4 md:space-y-6 sm:pb-8 pt-8">
                    <div className="mb-4 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="px-4 py-2 bg-white rounded-t-lg">
                        <div className="pb-4 md:pb-6">
                          <label
                            className="block mb-2 text-2xl font-medium text-gray-900 "
                            htmlFor="username"
                          >
                            Username
                          </label>
                          <input
                            type="text"
                            id="username"
                            name="username"
                            required
                            value={username}
                            placeholder={PreUsername}
                            onChange={(e) => setUsername(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                          />
                        </div>
                        <div className="pb-4 md:pb-6">
                          <label
                            className="block mb-2 text-2xl font-medium text-gray-900 "
                            htmlFor="campus"
                          >
                            Campus
                          </label>
                          <Select
                            onChange={(campus) => setCampus(campus.label)}
                            closeMenuOnSelect={false}
                            components={animated}
                            placeholder={PreCampus}
                            options={campusOptions}
                          />
                        </div>
                        <div>
                          <label
                            className="block mb-2 text-2xl font-medium text-gray-900 "
                            htmlFor="major"
                          >
                            Major
                          </label>
                          <Select
                            onChange={(major) => setMajor(major.label)}
                            closeMenuOnSelect={false}
                            components={animated}
                            placeholder={PreMajor}
                            options={majorOptions}
                          />
                        </div>
                      </div>
                      {/* <p className="py-4 text-lg text-green-600 text-center">
                        {message}
                      </p> */}
                    </div>
                  </form>
                  <div className="items-center gap-2 mt-3 sm:flex">
                    <button
                      onClick={(e) => {
                        updateItems(
                          { username, campus, major },
                          e,
                          setMessage,
                          `/api/users/${id}`
                        );
                        setShowModal(false);
                        window.location.reload(false);
                      }}
                      className="w-full mt-2 p-2.5 flex-1 text-white bg-blue-700 rounded-md outline-none ring-offset-2 ring-blue-700 focus:ring-2"
                    >
                      Update
                    </button>
                    <button
                      className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="items-center gap-2 mt-3 sm:flex"></div>
                </div>
              </div>
            </div>
          </div>

          <div>ádasdasdasdadsasđá</div>
          <form></form>
        </>
      ) : null}

      <div>{message}</div>
    </div>
  );
}
