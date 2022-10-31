import {SessionProvider, useSession} from "next-auth/react";
import "../../styles/globals.css";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
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


function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true })

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return children
}