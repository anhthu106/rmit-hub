// BACKEND
import connectMongo from "../../backend/lib/connectDB";
import { useSession } from "next-auth/react";
import importRawData from "../../backend/helper/data/data";

// model
import Teams from "../../backend/models/team";
import Users from "../../backend/models/user";
import Course from "../../backend/models/course";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import dynamic from "next/dynamic";

// COMPONENT
const CreateTeam = dynamic(() => import("../../components/team/CreateTeam"));
const TeamInformation = dynamic(() =>
  import("../../components/team/TeamInformation")
);

export async function getServerSideProps() {
  await connectMongo();

  const courseData = await Course.find({}, "name");
  const teamData = await Teams.find({});
  const teams = await Promise.all(
    teamData.map(async (doc) => {
      const team = doc.toObject();
      team._id = team._id.toString();
      team.postID = team.postID.toString();

      team.userID = await Promise.all(
        team.userID.map(async (id) => {
          id = id.toString();
          const user = await Users.findById(id, "username").lean();
          return user["username"];
        })
      );

      team.listID = await Promise.all(
        team.listID.map(async (id) => {
          id = id.toString();
          return id;
        })
      );

      team.pending = await Promise.all(
        team.pending.map(async (id) => {
          id = id.toString();
          return id;
        })
      );

      const course = await Course.findById(
        team.courseID.toString(),
        "name"
      ).lean();
      team.courseID = course["name"];

      return team;
    })
  );

  const courses = importRawData(courseData, ["_id"], null);

  return {
    props: {
      courseProps: courses,
      teamProps: teams,
    },
  };
}

export default function Team({ courseProps, teamProps }) {
  const { data: session, status } = useSession();
  if (status === "Loading") {
    return <div>Loading</div>;
  } else if (status === "authenticated") {
    const id = session.user._id.toString();
    return (
      <>
        <div className="bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-300 via-indigo-400 to-indigo-500">
          <Header />
          <div className="bg-gray-100">
            <div className="flex justify-center w-full h-[calc(100vh-62px)] px-4 text-gray-700">
              <div className="flex w-full xl:px-40 2xl:px-80">
                <div className="flex flex-col flex-grow border-l border-r border-gray-300 w-0">
                  <div className="flex justify-between px-8 py-4 border-b border-gray-300">
                    <h1 className="text-xl font-semibold">Teams</h1>
                  </div>
                  <CreateTeam courseProps={courseProps} OwnerUser={id} />
                  <div className="flex-grow h-0 overflow-auto snap-y snap-always">
                    <div className="w-full">
                      {teamProps.map((team) => (
                        <div key={team._id} className="space-y-2 snap-start">
                          <TeamInformation
                            User={team.userID}
                            CourseId={team.courseID}
                            Member={team.Member}
                            Name={team.name}
                            Description={team.Description}
                            TeamID={team._id}
                          />
                        </div>
                      ))}
                    </div>
                    <span className="md:hidden block snap-end">
                      <Footer />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span className="hidden md:block">
            <Footer />
          </span>
        </div>
      </>
    );
  }
}

Team.auth = true;
