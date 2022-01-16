import SpotifyWebApi from "spotify-web-api-node";

// it will ask spotify api to give access to below permissions.
const scopes = [
    'user-read-email',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-read-email',
    'streaming',
    'user-read-private',
    'user-library-read',
    'user-top-read',
    // "user-library-modify",
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-follow-read',
].join(',')
// it will make one big string with comma [ "user-read-email,playlist-read-private,.." ]

const params = {
    scope: scopes
}

const queryParamString = new URLSearchParams(params) //it will return object

const LOGIN_URL = "https://accounts.spotify.com/authorize?" + queryParamString.toString()

// it contains: https://accounts.spotify.com/authorize?params=user-read-email,playlist-read-private...

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET
})


export default spotifyApi;


export {LOGIN_URL}