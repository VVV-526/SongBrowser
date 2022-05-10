import React, { ReactNode, useEffect, useState } from "react"
import Layout from "../components/layout"
import styles from "../styles/Home.module.css"
import { List, ListItem, ListItemButton, ListItemAvatar, ListItemText, Avatar, ListSubheader, Divider, Card, CardContent, Typography } from "@mui/material"
import AddBoxIcon from '@mui/icons-material/AddBox';
import PlaylistCard from "../components/playlistCard"
// import plstyle from "../styles/Playlist.module.css"
import { collection, getDocs, onSnapshot, query } from "firebase/firestore"
import { db } from "./firebase"

type playlistType = {
  playlistID: number,
  playlistName: string,
  songs: songType[]
}

type songType = {
  id: number,
  title: string,
  album: string,
  artist: string
}

const playlistData: playlistType[] = [
  {
    playlistID: 1,
    playlistName: "Miley's songs",
    songs: [
      {
        id: 1,
        title: "Malibu",
        album: "Younger Now",
        artist: "Miley Cyrus",
      },
      {
        id: 2,
        title: "Party In The USA",
        album: "Party In The U.S.A - Single",
        artist: "Miley Cyrus",
      },
      {
        id: 3,
        title: "The Climb",
        album: "Party In The U.S.A - Single",
        artist: "Hannah Montana",
      }
    ]
  },
  {
    playlistID: 2,
    playlistName: "Recent favorites",
    songs: [
      {
        id: 1,
        title: "Red",
        album: "Red",
        artist: "Taylor Swift",
      },
      {
        id: 2,
        title: "Enemy",
        album: "Enemy",
        artist: "Imagine Dragons with JID",
      },
      {
        id: 3,
        title: "Out of the Woods",
        album: "1989",
        artist: "Taylor Swift",
      }
    ]
  },
  {
    playlistID: 3,
    playlistName: "Rock Songs Mix",
    songs: [
      {
        id: 1,
        title: "Hotel California",
        album: "Hotel California",
        artist: "Eagles",
      },
      {
        id: 2,
        title: "Hey Jude",
        album: "Hey Jude",
        artist: "Beatles",
      },
      {
        id: 3,
        title: "Born to Run",
        album: "Born to Run",
        artist: "Bruce Springteen",
      }
    ]
  }
];

const playlistCollectionRef = collection(db, 'playlists');
const playlistQuery = query(playlistCollectionRef);

const Playlist = () => {
  // console.log(playlistQuery);
  // // const [playlists, setTasks] = useState<playlistType[]>(null)
  // // useEffect(() => {
  // //   const unsubscribe = onSnapshot(playlistQuery, (querySnapshot) => {
  // //     const plData:playlistType[] = querySnapshot.docs.map((doc) => ({...doc.data()} as playlistType));
  // //     setTasks(plData);
  // //   })
  // //   return unsubscribe
  // // }, [])

  // // console.log(playlists);

  return (
    <Layout title="Playlist">
      {/* <div className={plstyle.bottomContent}>
        <div className={plstyle.sidebar}>myplaylist</div> */}
      <div className={styles.grid}>
        {playlistData.map((data) => {
          return (
            <PlaylistCard key={data.playlistID} {...data}></PlaylistCard>
          )
        })}
        <div className={styles.playlist}>
          <Card sx={{ display: 'flex' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                {"Create more lists!"}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {"Playlist"}
              </Typography>
            </CardContent>
            <ListItem>
              <ListItemButton>
                <ListItemAvatar>
                  <AddBoxIcon fontSize="large"></AddBoxIcon>
                </ListItemAvatar>
                <ListItemText primary={`add songs`} />
              </ListItemButton>
            </ListItem>
          </Card>
        </div>
      </div>
      {/* </div> */}
    </Layout>
  )
}

export default Playlist
