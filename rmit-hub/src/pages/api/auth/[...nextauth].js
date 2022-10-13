import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import bcrypt from "bcrypt";

export default NextAuth({
    providers: [
        CredentialProvider({
            name: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "johndoe@test.com",
                },
                password: { label: "Password", type: "password" },
            },

            authorize: async (credentials, req) => {
                const email = credentials.email;
                const password = credentials.password;
                const user = await Users.findOne({ email })

                if (!user) throw new Error("You haven't registered yet!")

                if (user) return signinUser({ password, user })
            },
        }),
    ],

    callbacks: {
        jwt: ({ token, user }) => {
            if (user) token.id = user.id;

            return token;
        },

        session: ({ session, token }) => {
            if (token) session.id = token.id;

            return session;
        },
    },
    secret: "test",

    jwt: {
        secret: "test",
        encryption: true,
    }

});

const signinUser = async ({ password, user }) => {
    if (!user.password) {
        throw new Error("Please enter password!")
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error("Password Incorrect!");
    }
    return user;
}