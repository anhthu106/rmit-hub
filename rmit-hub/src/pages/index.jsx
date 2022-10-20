import { signOut, useSession } from "next-auth/react";
import LoginBtn from "../components/auth/loginBtn";


export default function Home() {
  return (
    <div>
      <main>
          <LoginBtn />
      </main>
    </div>
  );
}