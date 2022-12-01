import {Dropdown} from "flowbite-react";

export default function Post({
                                 author,
                                 date,
                                 content,
                                 course,
                                 tag
                             }){
    return (
        <>
            <div className="flex items-center justify-center">
                <div className="rounded-xl border p-5 shadow-md w-full bg-white">
                    <div className="flex w-full items-center justify-between border-b pb-3">
                        <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 rounded-full bg-slate-400 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-300 via-indigo-400 to-indigo-500"></div>
                            <div className="text-lg font-bold text-slate-700">{author}</div>
                        </div>
                        <div className="flex items-center">
                            {/* <button className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">
                Category
              </button> */}
                            <div className="text-xs text-neutral-500">{date}</div>
                            <div>
                                <Dropdown caret color="secondary" className=""placement="left-start" label={""}>
                                    <Dropdown.Item className="hover:bg-white" >
                                        {tag} {/* delete tag */}
                                    </Dropdown.Item>
                                    {/* <Dropdown.Item>Settings</Dropdown.Item>
                  <Dropdown.Item>Earnings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>Separated link</Dropdown.Item> */}
                                </Dropdown>
                            </div>

                            {/* <div className="p-5">
                  <div className="justify-center">
                    <div className="group h-0 ">
                      <div>
                        <div>
                          <div slot="icon">
                            <p>...</p>
                          </div>
                        </div>
                      </div>
                      <div className="w-full hidden group-hover:block border-t-0 z-10">

                      </div>
                    </div>
                  </div>
                </div> */}
                        </div>
                    </div>
                    <ReturnPost course={course} content={content} />
                    <div>
                        <div className="flex items-center justify-between text-slate-500">
                            <div className="flex space-x-4 md:space-x-8">
                                <div className="flex cursor-pointer items-center transition hover:text-slate-600">
                                    <span>LOL something goes here</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function ReturnPost(props) {
    return (
        <>
            <div className="mt-4 mb-6">
                <div className="mb-3 text-xl font-bold">Course</div>
                <div className="text-sm text-neutral-600">{props.course}</div>
            </div>
            <hr />
            <div className="mt-4 mb-6">
                <div className="text-sm text-neutral-600">{props.content}</div>
            </div>
        </>
    );
}
