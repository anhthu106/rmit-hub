import Link from "next/link";

export default function Information({id,username, email, campus, major}) {
    return (
        <div>
            <Link href={`/users/${id}`}>{id}</Link>
            <div>
                <div>{username}</div>
                <div>{email}</div>
                <div>{campus}</div>
                <div>{major}</div>
            </div>

        </div>
    )
}