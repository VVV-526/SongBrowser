import React, { useEffect, useState } from "react"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { db } from "../pages/firebase"
import PlaylistCard from "./playlistCard"

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


const defaultPlaylist = () => {
    const defaultPLQuery = query(
        collection(db, "playlists"),
        where("owner", "==", "default"))

    const [defaultPl, setPlaylists] = useState<playlistWithId[]>([])

    useEffect(() => {
        const unsubscribe = onSnapshot(defaultPLQuery, (querySnapshot) => {
            const dplData: playlistWithId[] = querySnapshot.docs.map((doc) => ({ ...doc.data() as playlistType, id: doc.id } as playlistWithId));
            setPlaylists(dplData)
        })
        return unsubscribe
    }, [])

    return (
        <div>
            {
                defaultPl.map((data: any) => {
                    return (
                        <PlaylistCard key={data.id} {...data} > </PlaylistCard>
                    )
                })}
        </div>
    )
}

export default defaultPlaylist
