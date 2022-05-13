import { useRouter } from "next/router";
import Layout from "../components/layout"
import styles from "../styles/Home.module.css"
import Search from "../components/search"
import { Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import React, { useEffect, useState } from "react"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { db } from "../pages/firebase"
import { PlaylistType, PlaylistWithId } from "../types"
import Recommendation from "../components/recommendation"

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

const HomePage = () => {
  const router = useRouter();
  const recommendPLQuery = query(
    collection(db, "playlists"),
    where("owner", "==", "recommendation"))

  const [recommendPl, setPlaylists] = useState<playlistWithId[]>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(recommendPLQuery, (querySnapshot) => {
      const rplData: playlistWithId[] = querySnapshot.docs.map((doc) => ({ ...doc.data() as playlistType, id: doc.id } as playlistWithId));
      setPlaylists(rplData)
    })
    return unsubscribe
  }, [])

  return (
    <Layout title="Home">
      <Search></Search>
      <div className={styles.grid}>
        {
          recommendPl.map((data: any) => {
            return (
              <Recommendation key={data.id} {...data} > </Recommendation>
            )
          })}

        <a className={styles.card}>
          <h2>Find More Lists&rarr;</h2>
          <p>More songs coming!</p>
        </a>
      </div>
    </Layout>
  )
}

export default HomePage
