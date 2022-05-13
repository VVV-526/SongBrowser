import { Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import React, { useEffect, useState } from "react"
import styles from "../styles/Home.module.css"

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


const recommendation = ({ playlist_name, des, songs, id }: playlistWithId) => {
    return (
        <a className={styles.card}>
            <h2>{playlist_name} &rarr;</h2>
            {songs.map((value) => {
                const labelId = `checkbox-list-secondary-label-${value.sid}`;
                const [url, setUrl] = useState("");
                useEffect(() => {
                    const func = async () => {
                        const storage = getStorage();
                        const ImgRef = ref(storage, `img/${value.album_name}.png`);
                        const url = await getDownloadURL(ImgRef);
                        setUrl(url);
                        console.log(url)
                    }
                    func();
                }, []);
                return (
                    <ListItem
                        key={value.sid}>
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar
                                    alt={`Avatar n°${value.sid + 1}`}
                                    src={url}
                                />
                            </ListItemAvatar>
                            <ListItemText id={labelId} primary={`${value.song_name}`} />
                        </ListItemButton>
                    </ListItem>

                )
            })}
        </a>)
}

export default recommendation
