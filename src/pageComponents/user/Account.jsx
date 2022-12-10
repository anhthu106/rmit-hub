import UserInformation from "../../components/users/UserInformation";
import DisplayPost from "../post/DisplayPost";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

export function Account({ Info, postProps, tag, session, courseProps }) {
  return (
    <div className="bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-300 via-indigo-400 to-indigo-500">
      <Header />

      <div>
        <div className="container mx-auto md:px-4">
          <div className="bg-white w-full shadow-xl rounded-lg">
            <div className="flex leading-relaxed">
              <div className="container mx-auto md:px-8" id="myportal">
                <div className="lg:flex md:mt-20">
                  <div className="lg:w-4/12 mx-auto md:mt-10 h-fit px-8 py-6 shadow-2xl sm:drop-shadow-2xl rounded-lg">
                    <div className="text-center">
                      <UserInformation
                        username={Info.username}
                        email={Info.email}
                        campus={Info.campus}
                        major={Info.major}
                        image={Info.image}
                      />
                      {tag}
                    </div>
                  </div>

                  <div className="lg:w-8/12 lg:ml-6">
                    {postProps.map((post) => (
                      <div key={post._id}>
                        <DisplayPost
                          author={Info.username}
                          date={post.updatedAt}
                          content={post.content}
                          course={post.courseID.name}
                          id={post._id}
                          sessionName={session.user._id}
                          username={Info._id}
                          image={post.image.imgURL}
                          avatar={post.userID.image.imgURL}
                          courseProps={courseProps}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
