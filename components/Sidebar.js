import { HomeIcon, SearchIcon, LibraryIcon, PlusCircleIcon, RssIcon } from '@heroicons/react/outline'
import { HeartIcon } from '@heroicons/react/solid'

import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import useSpotify from "../hooks/useSpotify"

// to use recoil
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../atoms/playlistAtoms'

function Sidebar() {
    const { data: session, status } = useSession()
    const [playlists, setPlaylists] = useState([])

    // from RECOIL ATOM
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)

    // console.log(session)

    // importing custom hooks
    const spotifyApi = useSpotify()

    // when the sidebar load, it will run
    useEffect(() => {
        // if spotifyApi have access Token
        if (spotifyApi.getAccessToken()) {
            // then we will get user playlist and setting those playlist in our useState playlists
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items)
            })
        }
    }, [session, spotifyApi])

    // console.log("playlists >>>", playlists)

    return (
        <div className='text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36'>
            <div className="space-y-4" >

                <button className='flex items-center space-x-2 hover:text-white'>
                    <HomeIcon className='h-5 w-5' />
                    <p>Home</p>
                </button>

                <button className='flex items-center space-x-2 hover:text-white'>
                    <SearchIcon className='h-5 w-5' />
                    <p>Search</p>
                </button>

                <button className='flex items-center space-x-2 hover:text-white'>
                    <LibraryIcon className='h-5 w-5' />
                    <p>Your Library</p>
                </button>

                <hr className='border-t-[0.1px] border-gray-900' />



                <button className='flex items-center space-x-2 hover:text-white'>
                    <PlusCircleIcon className='h-5 w-5' />
                    <p>Create Playlist</p>
                </button>

                <button className='flex items-center space-x-2 hover:text-white'>
                    <HeartIcon className='text-blue-500 h-5 w-5' />
                    <p>Liked Song</p>
                </button>

                <button className='flex items-center space-x-2 hover:text-white'>
                    <RssIcon className='h-5 w-5 text-green-500' />
                    <p>Your episodes</p>
                </button>

                <hr className='border-t-[0.1px] border-gray-900' />



                {/* to render playlist */}
                {playlists.map((playlist) => (
                    <p key={playlist.id} className='cursor-pointer hover:text-white'>{playlist.name}</p>
                ))}

            </div>
        </div>
    )
}

export default Sidebar
