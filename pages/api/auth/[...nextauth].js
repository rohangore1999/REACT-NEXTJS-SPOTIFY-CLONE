import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify"


async function refreshAccessToken(token) {
    try {
        spotifyApi.setAccessToken(token.accessToken)
        spotifyApi.setRefreshToken(token.refreshToken)

        // so now we are giving accessToken(expired) and refreshToken to spotifyApi and spotify will give use the new access token.
        // which we renamed the response as 'refreshedToken'
        const { body: refreshedToken } = await spotifyApi.refreshAccessToken()

        console.log('REFRESH TOKEN IS...', refreshedToken)

        return {
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now + refreshedToken.expires_in * 1000, // again we are resetting the accessTokenExpires in with the 1hr 

            // if incase spotify gave the refresh token then use that else '??' use the old one
            refreshtoken: refreshedToken.refresh_token ?? token.refreshToken
        }


    } catch (error) {
        console.log(error)
        return {
            ...token,
            error: "RefreshAccessTokenError"
        }
    }
}

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        SpotifyProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            authorization: LOGIN_URL
        }),
        // ...add more providers here
    ],
    secret: process.env.JWT_SECRET,
    // to create custom login page
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({ token, account, user }) {
            // if initial signin
            if (account, user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    accessTokenExpires: account.expires_at * 1000,
                    // as spotify access token get expires at every 1hr
                    // so with the help of refresh token we can generate new access token
                    // "account.expires_at * 1000" >> we are converting it into milliseconds hence * 1000
                }
            }

            // return the previous token if the access token has not expored yet
            // checking that current time is less that the time which spotify gave
            if (Date.now() < token.accessTokenExpires) {
                console.log("EXISTING ACCESS TOKEN IS VALID")
                return token
            }

            // if the access token expires, so we need to refresh it using refreshToken...
            console.log("ACCESS TOKEN HAS EXPIRED, REFRESHING...")
            return await refreshAccessToken(token) //it will pass the that expired token to refreshAccessToken() << our function

        },

        // after jwt token generated...
        // NEXT AUTH handeling
        // connnected to where client can see in the session
        async session({ session, token }) {
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.username = token.username;

            return session
        }


    }
})