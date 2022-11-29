import {SessionProvider, useSession} from "next-auth/react";
import "../../styles/globals.css";
import Header from "../components/header/Header";
import HeroSection from "../components/landing/HeroSection";
import FeatureSections from "../components/landing/FeatureSections";
import TeamSection from "../components/landing/TeamSection";
import Footer from "../components/footer/Footer";

function MyApp({Component, pageProps: {session, ...pageProps}}) {
    return (
        <SessionProvider session={session}>
            {Component.auth ? (
                <Auth>
                    <Component {...pageProps} />
                </Auth>
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
            <>
                {/* Header */}
                <Header></Header>

                <HeroSection></HeroSection>

                {/* Feature Sections */}
                <FeatureSections></FeatureSections>

                {/* Team Section */}
                <TeamSection></TeamSection>

                {/* Footer */}
                <Footer></Footer>
            </>
        )
    }

    return children
}