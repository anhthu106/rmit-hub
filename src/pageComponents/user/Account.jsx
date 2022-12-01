import UserInformation from "../../components/users/UserInformation";
import EditProfileForm from "../../components/users/EditProfileForm";
import DisplayPost from "../../components/posts/DisplayPost";

export function Account({ Info, majorProps, postProps, tag, session }) {
  return (
    <div>
      
      <div className=" text-center">
        <UserInformation
          username={Info.username}
          email={Info.email}
          campus={Info.campus}
          major={Info.major}
        />
        {tag}
      </div>

      
      <br />
      {postProps.map((post) => (
        <div key={post._id}>
          <DisplayPost
            author={Info.username}
            date={post.currentDate}
            content={post.content}
            course={post.courseID.name}
            id={post._id}
            sessionName={session.user._id}
            username={Info._id}
          />
        </div>
      ))}
    </div>
  );
}
