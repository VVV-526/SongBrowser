import React, { ReactNode, useEffect, useState } from "react"
import styles from "../styles/Home.module.css"
import { List, ListItem, ListItemButton, ListItemAvatar, ListItemText, Avatar, ListSubheader, Divider, Card, CardContent, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import plstyles from "../styles/Playlist.module.css"
import {getStorage, ref, getDownloadURL} from "firebase/storage"

type playlistType = {
    pid: number,
    playlist_name: string,
    songs: songType[]
    des: string
}

type songType = {
    sid: number,
    song_name: string,
    album_name: string,
    artist_name: string
}



const playlistCard = ({pid, playlist_name, des, songs} : playlistType) => {
    return (
        <div className={styles.playlist}>
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              {playlist_name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {des}
            </Typography>
          </CardContent>
          <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                {"My favorite"}
                <CloseIcon className={plstyles.closebutton} ></CloseIcon>
              </ListSubheader>
            }>
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
                  key={value.sid}
                  secondaryAction={
                    <DeleteIcon fontSize="small">
                    </DeleteIcon>
                  }
                >
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
              );
            })}
            <Divider />
            <nav aria-label="secondary mailbox folders">
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="More >>" />
                    <AddCircleIcon fontSize="small"></AddCircleIcon>
                  </ListItemButton>
                </ListItem>
              </List>
            </nav>
          </List>
        </Card>
      </div>
    )
}

export default playlistCard;
