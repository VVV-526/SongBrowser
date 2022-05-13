import React, { useEffect, useState } from "react"
import PlaylistCard from "../components/playlistCard"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { db } from "../pages/firebase"
import { useAuth } from "../components/auth/AuthUserProvider"
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { PlaylistType, PlaylistWithId, SongWithSid } from "../types"

const SelectorWithUser = () => {
    const [playlists, setPlaylists] = useState<PlaylistWithId[]>([]);
    const { user } = useAuth()
    const [value, setValue] = useState("");
    const playlistQuery = query(
        collection(db, 'playlists'),
        where("owner", "==", user!.email!))

    const handleChange = (event: SelectChangeEvent) => {
        setValue((event.target as HTMLInputElement).value);
    };

    useEffect(() => {
        const unsubscribe = onSnapshot(playlistQuery, (querySnapshot) => {
            const plData: PlaylistWithId[] = querySnapshot.docs.map(
                (doc) => ({ ...doc.data() as PlaylistType, id: doc.id } as PlaylistWithId)
            );
            console.log(plData);
            setPlaylists(plData);
        })
        return unsubscribe
    }, [])
    
    return (
        <Select
            labelId="playlist-select-label"
            id="playlist-select"
            value={value}
            label="Playlist"
            onChange={handleChange} >
            {playlists.map((data) => {
                return (
                    <MenuItem key={data.id} value={data.id}>{data.playlist_name}</MenuItem>
                )
            })}
        </Select>
    )

}

export default SelectorWithUser
