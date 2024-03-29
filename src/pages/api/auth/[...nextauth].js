import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import Users from "../../../backend/models/user";
import connectDB from "../../../backend/lib/connectDB";
import Teams from "../../../backend/models/team";

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
                password: {label: "Password", type: "password"},
            },

            authorize: async (credentials, req) => {
                await connectDB()
                const email = credentials.email;
                const password = credentials.password;
                const check = await Users.findOne({email: email})
                if (!check) throw new Error("You haven't registered yet!")
                if (check) {
                    const user = await Users.findOne({email: email}, "_id username email campus major_id team_id post_id task_id")
                    if (!check.password) {
                        throw new Error("Please enter password!")
                    }
                    const isMatch = await bcrypt.compare(password, check.password)

                    if (!isMatch) {
                        throw new Error("Password Incorrect!");
                    }
                    return user;
                }
                return null
            },
        }),
    ],

    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.user = user;
            }
            return token;
        },

        async session({session, token}) {
            if (token) {
                await connectDB()
                session.user = await Users.findOne({email: token.user.email}, "_id username email campus major_id team_id post_id task_id image").populate("team_id", "name courseID", Teams)
            } else {
                session.user = token.user;
            }
            return session;
        }
    },
    secret: "test",
    pages: {
        signIn: "/signin",
        error: "/signin"
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        encryption: true,
    },
});
