import React, { ReactNode, useEffect, useState } from "react"
import Layout from "../components/layout"
import styles from "../styles/Home.module.css"
import PlaylistCard from "../components/playlistCard"
import AddPlaylistButton from "../components/addPlaylist"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { db } from "./firebase"
import { useAuth } from "../components/auth/AuthUserProvider"
import { signInWithGoogle } from "./firebase"
import { CircularProgress } from "@mui/material"
import plstyles from "../styles/Playlist.module.css"

type playlistType = {
  playlist_name: string,
  songs: songType[],
  des: string,
  owner:string
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


const Playlist = () => {
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

  //console.log(playlists.length);

  return (
    <Layout title="Playlist">
      <div className={styles.grid}>
        {loading ? (
          <CircularProgress />
        ) : user ? (
          playlists ?
            (playlists.map((data) => {
              return (
                <PlaylistCard key={data.id} {...data}></PlaylistCard>
              )
            })) : <CircularProgress />
        ) : (
          <div>
            <h4 className={plstyles.reminder}>Sign in to view your saved playlists!</h4>
          </div>
        )}
      </div>
      <AddPlaylistButton></AddPlaylistButton>
    </Layout>
  )
}

export default Playlist
