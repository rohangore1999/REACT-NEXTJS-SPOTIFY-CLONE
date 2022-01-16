import { useSession } from "next-auth/react"
import { useRecoilState } from "recoil"
import useSpotify from "../hooks/useSpotify"
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom"
import { useCallback, useEffect, useState } from "react"
import useSongInfo from '../hooks/useSongInfo'
import { SwitchHorizontalIcon } from "@heroicons/react/outline"
import { RewindIcon } from "@heroicons/react/solid"

import { VolumeUpIcon as VolumeDownIcon } from '@heroicons/react/outline';
import { VolumeUpIcon } from '@heroicons/react/outline';
import {
    PauseIcon,
    PlayIcon,
    FastForwardIcon,
    ReplyIcon,
} from '@heroicons/react/solid';

// using debounce it will wait for multiple request to complete and send once the request stop it will send one request to api; as for volume when we scroll the volumn range for each and every point it will keep sending the request so it cause API expiry

import debounce from 'lodash/debounce';

function Player() {

    // from recoil
    const [currentTrackId, setCurrentIdTrack] = useRecoilState(currentTrackIdState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)


    // users login sesison
    const { data: session, status } = useSession()

    // from spotify API
    const spotifyApi = useSpotify()

    // for Volume[ by default it is 50]
    const [volume, setVolume] = useState(50)

    // calling custom hooks
    // it will give use the currentSong's information in json format
    const songInfo = useSongInfo()



    // fetching the song, if we dont have songinfo>>> which means it will not show the image of current playing song
    const fetchCurrentSong = () => {
        if (!songInfo) {
            // we are getting the Current Playing track and set it to Current Track Id
            spotifyApi.getMyCurrentPlayingTrack().then((data) => {
                console.log("Now Playing: ", data.body?.item)
                setCurrentIdTrack(data.body?.item?.id)

                // spotify will say if you are playing this song... yes or noo
                spotifyApi.getMyCurrentPlaybackState().then((data) => {
                    setIsPlaying(data.body?.is_playing)
                })
            })
        }
    }

    useEffect(() => {
        // we have the access token but no current tack is playing(means no id)
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            // fetch the song info
            fetchCurrentSong()
            // setting the volumn to 50
            setVolume(50)
        }
    }, [currentTrackId, spotifyApi, session])


    const handlePlayPause = () => {
        // NEED PREMIUM ....
        // spotifyApi.getMyCurrentPlaybackState().then((data) => {
        //     if (data.body.is_playing) {
        //         spotifyApi.pause()
        //         setIsPlaying(false)
        //     } else {
        //         spotifyApi.play()
        //         setIsPlaying(true)
        //     }
        // })
    }
    

    // using debounce it will wait for multiple request to complete and send once the request stop after givin millisec it will send one request to api; as for volume when we scroll the volumn range for each and every point it will keep sending the request so it cause API expiry

    const debouncedAdjustVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume).catch((err) => { })
        }, 500), //timer >>> it will debounce (means send request after 500 milisec)
        []
    )


    useEffect(() => {
        // here it will check for volume is in range or not... and it will invoke when we change our volume as it is depend on [volume] and after that it will call everytime our debouncedAdjustVolume function
        if (volume > 0 && volume < 100) {
            debouncedAdjustVolume(volume)
        }
    }, [volume])



    return (
        <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
            {/* left */}
            <div className="flex items-center space-x-4">
                <img className="hidden md:inline h-10 w-10" src={songInfo?.album.images?.[0]?.url} alt="" />

                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>

            {/* center */}
            <div className="flex items-center justify-evenly">
                <SwitchHorizontalIcon className="button" />
                <RewindIcon className="button" />

                {isPlaying ? (
                    <PauseIcon onClick={handlePlayPause} className="button w-10 h-10" />
                ) : (
                    <PlayIcon onClick={handlePlayPause} className="button w-10 h-10" />
                )}

                <FastForwardIcon className="button" />

                <ReplyIcon className="button" />

            </div>


            {/* RIGHT */}
            <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
                {/* when click on low it will move 10 step down */}
                <VolumeDownIcon onClick={() => volume > 0 && setVolume(volume - 10)} className="button" />

                <input className="w-14 md:w-28" value={volume} onChange={(e) => setVolume(Number(e.target.value))} type={'range'} min={0} max={100} />

                {/* when click on low it will move 10 step up */}
                <VolumeUpIcon onClick={() => volume < 100 && setVolume(volume + 10)} className="button" />
            </div>
        </div>
    )
}

export default Player
