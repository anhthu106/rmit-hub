import jwt from "jsonwebtoken";
import Repass from "../../pageComponents/auth/NewPassword";

export async function getServerSideProps({params}) {
    const payload = jwt.verify(params.token, process.env.JWT_SECRET);
    return {
        props: {
            Payload: payload.email,
        },
    };
}

export default function ResetPassword({Payload}) {
    return (
        <Repass email={Payload}/>
    );
}

ResetPassword.authed = true;
