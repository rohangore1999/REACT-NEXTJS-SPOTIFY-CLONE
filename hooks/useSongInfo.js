// this helper function will take the song id and give the proper required information
import { useRecoilState } from "recoil"
import useSpotify from "./useSpotify"
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom"
import { useEffect, useState } from "react"


function useSongInfo() {
    const spotifyApi = useSpotify()
    const [currentIdTrack, setCurrentIdTrack] = useRecoilState(currentTrackIdState)

    // for song info
    const [songInfo, setSongInfo] = useState(null)

    useEffect(() => {
        const fetchSongInfo = async () => {
            if (currentIdTrack) {
                // if the song selected
                // in fetch passing the id of the track
                //  and in 2nd argument we are passing the header along with Bearer and accessToken so that spotify knows you are authenticate person 
                const trackInfo = await fetch(
                    `https://api.spotify.com/v1/tracks/${currentIdTrack}`,
                    {
                        headers: {
                            Authorization: `Bearer ${spotifyApi.getAccessToken()}`
                        }
                    }
                ).then(res => res.json()) //parsing response to json

                setSongInfo(trackInfo)
            }
        }

        // calling async function (must)
        fetchSongInfo()
    }, [currentIdTrack, spotifyApi])

    return songInfo
}

export default useSongInfo
