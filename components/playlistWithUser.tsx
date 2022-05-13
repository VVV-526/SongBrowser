import React, { useEffect, useState } from "react"
import PlaylistCard from "../components/playlistCard"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { db } from "../pages/firebase"
import { useAuth } from "../components/auth/AuthUserProvider"
import { CircularProgress } from "@mui/material"

type playlistType = {
    playlist_name: string,
    songs: songType[],
    des: string,
    owner: string
}

type songType = {
    sid: number,
    song_name: string,
    album_name: string,
    artist_name: string
}

type playlistWithId = playlistType & {
    id: string
};


const PlaylistWithUser = () => {
    const { user, loading } = useAuth()

    const playlistQuery = query(
        collection(db, "playlists"),
        where("owner", "==", user!.email!))

    const [playlists, setPlaylists] = useState<playlistWithId[]>([])

    useEffect(() => {
        const unsubscribe = onSnapshot(playlistQuery, (querySnapshot) => {
            const plData: playlistWithId[] = querySnapshot.docs.map((doc) => ({ ...doc.data() as playlistType, id: doc.id } as playlistWithId));
            setPlaylists(plData)
        })
        return unsubscribe
    }, [])

    return (
        <>
            {
                playlists ?
                    (playlists.map((data) => {
                        return (
                            <PlaylistCard key={data.id} {...data}></PlaylistCard>
                        )
                    })) : <CircularProgress />
            }
        </>
    )

}

export default PlaylistWithUser
