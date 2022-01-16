import { useRecoilState } from "recoil"
import { playlistState } from "../atoms/playlistAtoms"
import Song from '../components/Song'
function Songs() {
    // to get all the playlist which we store in RECOIL'S atom
    const [playlist, setPlaylist] = useRecoilState(playlistState)

    return (
        <div className="px-8 flex flex-col space-y-1 pb-28 text-white">
            {playlist?.tracks.items.map((track, i) => (
                <Song key={track.track.id} track={track} order={i} />
            ))}
        </div>
    )
}

export default Songs
