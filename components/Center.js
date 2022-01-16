import { ChevronDownIcon } from "@heroicons/react/outline"
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react";

import { shuffle } from 'lodash'

// to use recoil
import { useRecoilState } from 'recoil'
import { playlistIdState, playlistState } from '../atoms/playlistAtoms'
import useSpotify from "../hooks/useSpotify";

import Songs from "../components/Songs"

// define colors
const colors = [
    'from-indigo-500',
    'from-blue-500',
    'from-green-500',
    'from-red-500',
    'from-yellow-500',
    'from-pink-500',
    'from-purple-500',
];

function Center() {
    // get user data renaming as session from login
    const { data: session } = useSession()
    // console.log(session)

    //  to keep track of color we use state
    const [color, setColor] = useState(null)

    // from RECOIL ATOM
    // to get/store ids
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)
    // to get/store playlist
    const [playlist, setPlaylist] = useRecoilState(playlistState)


    const spotifyApi = useSpotify()


    // to load color when component mount
    useEffect(() => {
        // when component loaded it will set any random color .... "shuffle() >>> get from lodash library"
        setColor(shuffle(colors).pop())
    }, [playlistId])


    // run when spotifyApi or playlistId loads
    useEffect(() => {
        // for all the playlistId we are fetching all the playlist from spotify and then storing it to Playlist atom Recoil store
        spotifyApi.getPlaylist(playlistId).then((data) => {
            setPlaylist(data.body)
        }).catch((err) => console.log("Something went wrong", err))
    }, [spotifyApi, playlistId])


    console.log("PLAYLISTS >>> ", playlist)


    return (
        <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
            {/* to make center scrollable >> h-screen overflow-y-scroll scrollbar-hide */}
            {/* header */}
            <header className="absolute top-5 right-8">
                <div className="flex items-center bg-black text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2" onClick={signOut}>
                    <img className="rounded-full w-10 h-10" src={session?.user.image} alt="" />
                    <h2>{session?.user.name}</h2>
                    <ChevronDownIcon className="h-5 w-5" />
                </div>
            </header>
            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
                <img className="h-44 w-44 shadow-2xl" src={playlist?.images[0]?.url} alt="" />

                <div>
                    <p>PLAYLIST</p>
                    <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
                </div>

            </section>
            <div>
                <Songs />
            </div>
        </div>
    )
}

export default Center
