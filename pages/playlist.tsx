import React, { ReactNode, useEffect, useState } from "react"
import Layout from "../components/layout"
import styles from "../styles/Home.module.css"
import { List, ListItem, ListItemButton, ListItemAvatar, ListItemText, Avatar, ListSubheader, Divider, Card, CardContent, Typography } from "@mui/material"
import AddBoxIcon from '@mui/icons-material/AddBox';
import PlaylistCard from "../components/playlistCard"
import AddPlaylistButton from "../components/addPlaylist"
import { collection, getDocs, onSnapshot, query } from "firebase/firestore"
import { db } from "./firebase"
import CloseIcon from '@mui/icons-material/Close';
import plstyles from "../styles/Playlist.module.css"
import { Add } from "@mui/icons-material";

type playlistType = {
  playlist_name: string,
  songs: songType[],
  des: string
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

const playlistCollectionRef = collection(db, 'playlists');
const playlistQuery = query(playlistCollectionRef);

const Playlist = () => {
  console.log(playlistQuery);
  const [playlists, setTasks] = useState<playlistWithId[]>([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(playlistQuery, (querySnapshot) => {
      const plData: playlistWithId[] = querySnapshot.docs.map((doc) => ({ ...doc.data() as playlistType, id: doc.id} as playlistWithId));
      setTasks(plData);
    })
    return unsubscribe
  }, [])

  //console.log(playlists.length);

  return (
    <Layout title="Playlist">
      <div className={styles.grid}>
        {playlists.map((data) => {
          return (
            <PlaylistCard key={data.id} {...data}></PlaylistCard>
          )
        })}
      </div>
      <AddPlaylistButton></AddPlaylistButton>
    </Layout>
  )
}

export default Playlist
