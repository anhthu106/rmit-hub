import Image from "next/image";

export default function UserInformation({
    username,
    email,
    campus,
    major,
    image,
}) {
    const mailTo = "mailto:" + email
    return (
        <div>
            <div className="mx-auto pt-8 sm:pt-0">
                <Image
                    key={image}
                    className="mx-auto rounded-full"
                    src={image}
                    alt="avatar"
                    width='150'
                    height='150'
                />
            </div>
            <div
                className="text-2xl xl:text-4xl font-semibold leading-normal mb-2 md:pt-10 text-blueGray-700 break-words"
                key={username}
            >
                {username}
            </div>
            <div
                className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase hover:text-blue-700"
                key={email}
            >
                <a href={mailTo}>{email}</a>
            </div>
            <div className="mb-2 mt-10 text-left ">
                <div
                    key={campus}
                    className="flex items-center text-left py-4 mb-4 border-b"
                >
                    {campus}
                </div>
                <div
                    key={major}
                    className="flex items-center text-left py-4 mb-4 border-b"
                >
                    {major}
                </div>
            </div>
        </div>
    );
}
