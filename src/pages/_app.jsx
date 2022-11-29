import {SessionProvider, useSession} from "next-auth/react";
import "../../styles/globals.css";
import LandingPage from "../pageComponents/landingPage/LandingPage";
import {useRouter} from "next/router";

function MyApp({Component, pageProps: {session, ...pageProps}}) {
    return (
        <SessionProvider session={session}>
            {Component.auth ? (
                <Auth>
                    <Component {...pageProps} />
                </Auth>
            ) : Component.authed ? (
                <Authed>
                    <Component {...pageProps} />
                </Authed>
            ) : (
                <Component {...pageProps} />
            )}
        </SessionProvider>
    )
}

export default MyApp;


function Auth({children}) {
    // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
    const {status} = useSession()

    if (status === "loading") {
        return <div>Loading...</div>
    }

    if (status === "unauthenticated") {
        return (
            <LandingPage/>
        )
    }
    return children
}

function Authed({children}) {
    // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
    const {status} = useSession();
    const router = useRouter();

    if (status === "loading") {
        return <div>Loading...</div>
    }

    if(status === "authenticated"){
        // Return homepage
        router.push("/")
        return ;
    }

    return children
}