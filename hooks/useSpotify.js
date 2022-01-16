import { signIn, useSession } from 'next-auth/react'
import { useEffect } from "react"
import SpotifyWebApi from 'spotify-web-api-node'

// creating seperate instance here
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI

})


function useSpotify() {
    // getting user data
    const { data: session, status } = useSession()

    useEffect(() => {
        // if their is a session
        if (session) {
            // if their is the session.error === "RefreshAccessTokenError" >> which we get from [...nextauth].js li:31
            if (session.error === "RefreshAccessTokenError") {
                // if it is failed direct user to login
                signIn()
            }

            // else
            // setting the acess token when we get user
            spotifyApi.setAccessToken(session.user.accessToken)
        }
    }, [session])
    // it will run on component loaded or when the use session changes(login/logout)

    return spotifyApi
}

export default useSpotify
