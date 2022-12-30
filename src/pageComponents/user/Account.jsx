import UserInformation from "../../components/users/UserInformation";
import DisplayPost from "../post/DisplayPost";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Link from "next/link";

export default function Account({Info, postProps, tag, session, courseProps, createPost}) {
    return (
        <div
            className="bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-300 via-indigo-400 to-indigo-500">
            <Header/>

            <div className="min-h-[calc(100vh-62px-80px)]">
                <div className="container mx-auto md:px-4">
                    <div className="bg-gray-100 w-full shadow-xl rounded-lg">
                        <div className="flex leading-relaxed">
                            <div className="container mx-auto md:px-8" id="myportal">
                                <div className="lg:flex md:my-20">
                                    <div
                                        className="lg:w-4/12 mx-auto md:mt-4 h-fit px-8 shadow-xl sm:drop-shadow-2xl rounded-lg border-2 border-gray-100">
                                        <div className="text-center md:p-5">
                                            <UserInformation
                                                username={Info.username}
                                                email={Info.email}
                                                campus={Info.campus}
                                                major={Info.major}
                                                image={Info.image}
                                            />
                                            {tag}
                                        </div>

                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-xl font-bold leading-none text-gray-900">
                                                Teams
                                            </h3>
                                        </div>
                                        <div className="flow-root">
                                            {Info.team.map((team) => (
                                                <ul
                                                    key={team._id}
                                                    className="divide-y divide-gray-200">
                                                    <li className="py-3 sm:py-4">
                                                        <div className="flex items-center space-x-4">
                                                            <div className="flex-shrink-0">
                                                                <div
                                                                    className="w-8 h-8 rounded-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></div>
                                                            </div>
                                                            <div key={team._id}>
                                                                <Link href={`/team/${team._id}`}>
                                                                    <a
                                                                        key={team.name}
                                                                        className="flex-1 min-w-0 text-sm font-medium text-gray-900 truncate"
                                                                    >
                                                                        {team.name}
                                                                    </a>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="lg:w-8/12 lg:ml-6">
                                        {/* <CreatePost
                                            courseProps={courseProps}
                                            id={session.user._id}
                                            Info={session}
                                        /> */}
                                        {createPost}
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
                                                    uid={Info._id}
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

            <Footer/>
        </div>
    );
}
