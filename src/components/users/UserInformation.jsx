export default function UserInformation({ username, email, campus, major }) {
  return (
    // <div>
    //   <div className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
    //     {username}
    //   </div>
    //   <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
    //     {email}
    //   </div>
    //   <div className="mb-2 mt-10">
    //     <div>{campus}</div>
    //     <div>{major}</div>
    //   </div>
    // </div>

    <div>
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
