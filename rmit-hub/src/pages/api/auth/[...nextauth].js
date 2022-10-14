import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import Users from "../../../models/user.models";
import connectDB from "../../../lib/connectDB";

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
                await connectDB()
                const email = credentials.email;
                const password = credentials.password;
                const check = await Users.findOne({ email: email })
                if (!check) throw new Error("You haven't registered yet!")
                if (check) {
                    if (!check.password) {
                        throw new Error("Please enter password!")
                    }
                    const isMatch = await bcrypt.compare(password, check.password)

                    if (!isMatch) {
                        throw new Error("Password Incorrect!");
                    }
                    return check;
                }
                return null
            },
        }),
    ],

    callbacks: {
        async jwt ({ token, user }) {
            if (user) token.id = user.id;
            return token;
        },

        async session ({ session, token }) {
            if (token) session.id = token.id;

            return session;
        }
    },
    secret: "test",

    jwt: {
        secret: "test",
        encryption: true,
    }

});
// const signinUser = async ({ password, user }) => {
//
// }