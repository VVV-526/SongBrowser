import React, { ReactNode } from "react"
import Layout from "../components/layout"
import styles from "../styles/Home.module.css"
import { List, ListItem, ListItemButton, ListItemAvatar, ListItemText, Avatar, ListSubheader, Divider, Card, CardContent, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
//import PlaylistCard from "../components/playlistCard"

type playlistType = {
  playlistName: string,
  songs: [songType, songType, songType];
}

type songType = {
  id: number,
  title: string,
  album: string,
  artist: string
}

const playlistData: playlistType[] = [
  {
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
        title: "Party In The U.S.A",
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
  }
];


const Playlist = () => {

  return (
    <Layout title="Playlist">
      <div className={styles.grid}>
        {playlistData.map((item) => {
          return (
            <div className={styles.playlist}>
              <Card sx={{ display: 'flex' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="div" variant="h5">
                    {item.playlistName}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    {"My favorite"}
                  </Typography>
                </CardContent>
                <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                  subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      Miley's Songs
                    </ListSubheader>
                  }>
                  {item.songs.map((value) => {
                    const labelId = `checkbox-list-secondary-label-${value.id}`;
                    return (
                      <ListItem
                        key={value.id}
                        secondaryAction={
                          <DeleteIcon fontSize="small">
                          </DeleteIcon>
                        }
                      >
                        <ListItemButton>
                          <ListItemAvatar>
                            <Avatar
                              alt={`Avatar n°${value.id + 1}`}
                              src={`img/${value.title}.png`}
                            />
                          </ListItemAvatar>
                          <ListItemText id={labelId} primary={`${value.title}`} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                  <Divider />
                  <nav aria-label="secondary mailbox folders">
                    <List>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText primary="More" />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </nav>
                </List>
              </Card>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default Playlist
