import { useState } from "react";
import { searchItem } from "../../backend/helper/items/items";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import dynamic from "next/dynamic";

const CreatePost = dynamic(() => import("../../components/posts/CreatePost"));
const DisplayPost = dynamic(() => import("../post/DisplayPost"));
const Search = dynamic(() => import("../../components/Search/search"));

const Homepage = ({ courseProps, postProps, session, Info }) => {
  //UseState
  const [query, setQuery] = useState("");

  //Handling the input on our search bar
  const filtered = searchItem(query, postProps, "courseID", "name");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div
      id="myportal"
      className="bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-300 via-indigo-400 to-indigo-500"
    >
      <Header />

      <div className="bg-gray-100">
        <div className="flex justify-center w-full h-[calc(100vh-62px)] px-4 text-gray-700">
          <div className="flex w-full xl:px-40 2xl:px-80">
            <div className="flex flex-col flex-grow border-l border-r border-gray-300">
              <div className="flex justify-between px-8 py-4 border-b border-gray-300">
                <h1 className="text-xl font-semibold">Feed Title</h1>
                <Search onchange={handleChange} />
              </div>
              <div className="flex-grow h-0 overflow-auto lg:px-40 snap-y snap-always">
                <div className="w-full space-y-1 snap-start">
                  <CreatePost
                    courseProps={courseProps}
                    id={session.user._id}
                    Info={Info}
                  />

                  {filtered.map((post) => (
                    <div key={post._id} className="snap-start">
                      <DisplayPost
                        author={post.userID.username}
                        date={post.updatedAt}
                        content={post.content}
                        course={post.courseID.name}
                        id={post._id}
                        sessionName={session.user.username}
                        username={post.userID.username}
                        uid={post.userID._id}
                        image={post.image.imgURL}
                        avatar={post.userID.image.imgURL}
                        courseProps={courseProps}
                        teamID={post.teamID}
                      />
                    </div>
                  ))}

                  <span className="md:hidden block snap-end">
                    <Footer />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <span className="hidden md:block">
        <Footer />
      </span>
    </div>
  );
};

export default Homepage;
