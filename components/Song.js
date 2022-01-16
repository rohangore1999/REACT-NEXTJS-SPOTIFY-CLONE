import { useRecoilState } from "recoil"
import useSpotify from "../hooks/useSpotify"
import { millisToMinutesAndSeconds } from "../lib/time"
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom"

function Song({ order, track }) {
    const spotifyApi = useSpotify()

    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState) //currentTrackIdState >> Key value from songAtom
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState) // isPlayingState >> Key value from songAtom

    // function trigger when click on song it will play
    const playSong = () => {
        setCurrentTrackId(track.track.id) // Recoil atom to store the ID of what is playing
        setIsPlaying(true) // Recoil atom to store bool value if the song is playing or not

        // calling the spotify api and passing the track
        
        // AS WE NEED PREMIUM PLAN OF SPOTIFY TO PLAY SONGS

        // spotifyApi.play({
        //     uri: [track.track.uri]
        // })
    }

    return (
        <div className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer" onClick={playSong}>
            <div className="flex items-center space-x-4">
                <p>{order + 1}</p>
                <img className="w-10 h-10" src={track.track.album.images[0].url} />

                <div>
                    <p className="w-36 lg:w-64 text-white truncate">{track.track.name}</p>
                    <p className="w-40 ">{track.track.artists[0].name}</p>
                </div>
            </div>

            <div className="flex items-center justify-between ml-auto md:ml-0">
                {/* hide the track album on mobile as tailwind is by default for mobile; and show for medium device */}
                <p className="w-40 hidden md:inline">{track.track.album.name}</p>
                <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
            </div>
        </div>
    )
}

export default Song
