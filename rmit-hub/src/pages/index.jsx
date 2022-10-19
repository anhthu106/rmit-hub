import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import LoginBtn from "../components/auth/loginBtn";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  console.log("session", session);
  return (
    <div>
      <main>
          <LoginBtn />
      </main>
    </div>
  );
}