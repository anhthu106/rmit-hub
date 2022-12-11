import { SessionProvider, useSession } from "next-auth/react";
import "../../styles/globals.css";
import LandingPage from "../pageComponents/landingPage/LandingPage";
import { useRouter } from "next/router";
import { io } from "socket.io-client";
import { useEffect } from "react";
import Loading from "../components/loading/Loading";

let socket

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    useEffect(() => {
        const socketInitializer = async () => {
            await fetch("/api/socket");
            socket = io()

            socket.on('connect', () => { // Connect socket
                console.log(`⚡: ${socket.id} user just connected!`);
            })

            socket.on("disconnect", () => { // Disconnect socket
                console.log(socket.id);
            });

        }

        socketInitializer().then() // Call function
    }, []);

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


function Auth({ children }) {
    // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
    const { status } = useSession()

    if (status === "loading") {
        return (
            <Loading />
        )

    }

    if (status === "unauthenticated") {
        return (
            <LandingPage />
        )
    }
    return children
}

function Authed({ children }) {
    // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
    const { status } = useSession();
    const router = useRouter();

    if (status === "loading") {
        return (
            <Loading />
        )
    }

    if (status === "authenticated") {
        // Return homepage
        router.push("/")
        return;
    }

    return children
}