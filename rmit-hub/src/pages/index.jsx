import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import SignUp from "../components/auth/SignUp";
import LoginBtn from "../components/auth/login-btn";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  console.log("session", session);

  return (
    <div>
      <main>
        {/*{session ? (*/}
        {/*  <button onClick={() => signOut()}>Log out</button>*/}
        {/*) : (*/}
        {/*  <button*/}
        {/*    onClick={() => {*/}
        {/*      router.push("/api/auth/signin");*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    Sign in*/}
        {/*  </button>*/}
        {/*)}*/}
        {/*  <SignUp />*/}
          <LoginBtn />
      </main>
    </div>
  );
}