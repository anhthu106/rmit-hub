export default function UserInformation({ username, email, campus, major, image }) {
  return (
    <div>
      <div className="mb-4">
        <img
          className="mx-auto h-[10rem] w-[10rem] rounded-full"
          src={image}
          alt="avatar"
        />
      </div>
      <div className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 tẽt">
        {username}
      </div>
      <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
        {email}
      </div>
      <div className="mb-2 mt-10 text-left ">
        <div className="flex items-center text-left py-4 mb-4 border-b">{campus}</div>
        <div className="flex items-center text-left py-4 mb-4 border-b">{major}</div>
      </div>
    </div>
  );
}
