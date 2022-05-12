import SongItem from "./songItem"
import { SongWithId } from "../types"

type Props = {
    readonly songs: SongWithId[]
}

const SongList = ({ songs }: Props) => {
    return (
        <div>
            {songs.length ? (
                songs.map((song) => <SongItem key={song.id} song={song} />)
            ) : (
                <div>No songs found!</div>
            )}
        </div>
    )
}

export default SongList

