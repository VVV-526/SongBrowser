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
import PlaylistWithUser from "../components/playlistWithUser"
import DefaultPlaylist from "../components/defaultPlaylist"


const Playlist = () => {
  const { user, loading } = useAuth()

  return (
    <Layout title="Playlist">
      <div className={styles.grid}>
        {loading ? (
          <CircularProgress />
        ) : user ? (
          <PlaylistWithUser></PlaylistWithUser>
        )
         : (
          <div>
            <h4 className={plstyles.reminder}>Sign in to view your saved playlists!</h4>
            <DefaultPlaylist></DefaultPlaylist>
          </div>
        )}
      </div>
      <AddPlaylistButton></AddPlaylistButton>
    </Layout>
  )
}

export default Playlist
