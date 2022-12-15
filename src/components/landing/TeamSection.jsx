import Image from "next/image";

export default function TeamSection() {
    return (
        <section className="bg-white">
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
                <div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
                    <h2 className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                        About us
                    </h2>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                        Let &apos s meet the team
                    </p>
                </div>
                <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                    <Member
                        name="Pham Vo Dong"
                        avaUrl=""
                        role="Project manager - Backend leader"
                        linkFB="https://www.facebook.com/phamvodong0811"
                        linkGitHub="https://github.com/phamvodong"
                    />
                    <Member
                        name="Pham Anh Thu"
                        avaUrl=""
                        role="Backend developer - Researcher"
                        linkFB="https://www.facebook.com/ahthupham02"
                        linkGitHub="https://github.com/anhthu106"
                    />
                    <Member
                        name="Tran Ngoc Khang"
                        avaUrl=""
                        role="Frontend leader"
                        linkFB="https://www.facebook.com/Oct.13rd.k.u.z.e"
                        linkGitHub="https://github.com/KN2222"
                    />
                </div>
            </div>
        </section>
    );
}

function Member(props) {
    return (
        <div className="text-center text-gray-500 ">
            <Image
                className="mx-auto mb-4 w-36 h-36 rounded-full"
                src={props.avaUrl}
                alt="memberImg"
            />
            <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 ">
                <p href="#">{props.name}</p>
            </h3>
            <p>{props.role}</p>
            <ul className="flex justify-center mt-4 space-x-4">
                <li>
                    <a
                        href={props.linkFB}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#39569c] hover:text-gray-900 "
                    >
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </a>
                </li>
                <li>
                    <a
                        href={props.linkGitHub}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-900 hover:text-gray-900"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </a>
                </li>
            </ul>
        </div>
    );
}
