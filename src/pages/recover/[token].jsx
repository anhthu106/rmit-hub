import jwt from "jsonwebtoken";
import Repass from "../../components/auth/NewPassword";

export async function getServerSideProps({params}) {
    const payload = jwt.verify(params.token, process.env.JWT_SECRET)
    return {
        props: {
            Payload: payload.email
        }
    }
}

export default function ResetPassword({Payload}) {
    return (
        <div>
            <div>
                {Payload}
            </div>
            <div>
                <Repass email={Payload} />
            </div>
        </div>
    )
}