export default function UserInformation({ username, email, campus, major }) {
    return (
        <div>
            <div>{username}</div>
            <div>{email}</div>
            <div>{campus}</div>
            <div>{major}</div>
        </div>
    )
}