import Header from "../../components/header/Header";
import LoginForm from "../../components/auth/LoginForm";

// Login Page
const Login = () => {

    return (
        <>
            <section
                className="bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-300 via-indigo-400 to-indigo-500 grid h-screen">

                {/*Header*/}
                <Header></Header>

                {/*Body*/}
                <div
                    className="opacity-[1] flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-min lg:py-0 z-10 rounded-[50px] drop-shadow-2xl md:mt-0 sm:max-w-screen xl:p-0 ">
                    <div className="w-full md:mt-0 sm:max-w-md xl:p-0">
                        <div className="align-middle md:align-top w-full">
                            <div
                                className="bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-500 via-red-500 to-yellow-500 rounded-t-[50px] h-fit p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl text-center">
                                    Welcome Back!
                                </h1>
                                <h2 className="text-xl leading-tight tracking-tight text-gray-900 text-center">
                                    Sign in to your account
                                </h2>
                            </div>
                            <div className="bg-white rounded-b-[50px] pt-0">
                                <LoginForm/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default Login;
