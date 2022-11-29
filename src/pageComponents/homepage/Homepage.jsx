import {useState} from "react";
import {searchItem} from "../../backend/helper/items/items";
import Header from "../../components/header/Header";
import CreatePost from "../../components/posts/CreatePost";
import DisplayPost from "../../components/posts/DisplayPost";
import Search from "../../components/Search/search";

const Homepage = ({courseProps, postProps, session}) => {
    //UseState
    const [query, setQuery] = useState('');

    //Handling the input on our search bar
    const filtered = searchItem(query, postProps, 'courseID', 'name')

    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    return (
        <div
            className="bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-300 via-indigo-400 to-indigo-500">

            <Header/>

            <div className="bg-white">
                <div className="flex justify-center w-screen h-screen px-4 text-gray-700">
                    <div className="flex w-4/6">
                        <div className="flex flex-col flex-grow border-l border-r border-gray-300">
                            <div className="flex justify-between flex-shrink-0 px-8 py-4 border-b border-gray-300">
                                <h1 className="text-xl font-semibold">Feed Title</h1>
                            </div>
                            <div className="flex-grow h-0 overflow-auto">
                                <div className="w-full">
                                    <CreatePost
                                        courseProps={courseProps}
                                        id={session.user._id}
                                    />

                                    {filtered.map((post) => (
                                        <div key={post._id}>
                                            <DisplayPost
                                                author={post.userID.username}
                                                date={post.currentDate}
                                                content={post.content}
                                                course={post.courseID.name}
                                                id={post._id}
                                                sessionName={session.user.username}
                                                username={post.userID.username}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col flex-shrink-0 w-1/4 py-4 pl-4">
                            <div className="pt-2 relative mx-auto text-gray-600">
                                <Search onchange={handleChange}/>
                            </div>
                            <div className="flex-grow h-0 overflow-autos">
                                <h3 className="mt-6 font-semibold">Your Post</h3>
                                <div className="w-full">

                                    <div className="flex w-full py-4 border-b border-gray-300">
                                        <span className="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-full"></span>
                                        <div className="flex flex-col flex-grow ml-2">
                                            <div className="flex text-sm">
                                                <span className="font-semibold">Username</span>
                                                <span className="ml-1">@username</span>
                                            </div>
                                            <p className="mt-1 text-sm">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing
                                                elit, et dolore magna aliqua.{" "}
                                                <a className="underline" href="#">
                                                    #hashtag
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex w-full py-4 border-b border-gray-300">
                                        <span className="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-full"></span>
                                        <div className="flex flex-col flex-grow ml-2">
                                            <div className="flex text-sm">
                                                <span className="font-semibold">Username</span>
                                                <span className="ml-1">@username</span>
                                            </div>
                                            <p className="mt-1 text-sm">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing
                                                elit, et dolore magna aliqua.{" "}
                                                <a className="underline" href="#">
                                                    #hashtag
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex w-full py-4 border-b border-gray-300">
                                        <span className="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-full"></span>
                                        <div className="flex flex-col flex-grow ml-2">
                                            <div className="flex text-sm">
                                                <span className="font-semibold">Username</span>
                                                <span className="ml-1">@username</span>
                                            </div>
                                            <p className="mt-1 text-sm">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing
                                                elit, et dolore magna aliqua.{" "}
                                                <a className="underline" href="#">
                                                    #hashtag
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage;