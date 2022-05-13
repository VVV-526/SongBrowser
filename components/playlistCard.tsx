import React, { ReactNode, useEffect, useState } from "react"
import styles from "../styles/Home.module.css"
import { List, ListItem, ListItemButton, ListItemAvatar, ListItemText, Avatar, ListSubheader, Divider, Card, CardContent, Typography, Popover } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import plstyles from "../styles/Playlist.module.css"
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { collection, deleteDoc, deleteField, doc, onSnapshot, query, updateDoc } from "firebase/firestore";
import { db } from '../pages/firebase';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import AddSong from "./addSong"

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


const PlaylistCard = ({ playlist_name, des, songs, id }: playlistWithId) => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deletePlaylist = async () => {
    await deleteDoc(doc(db, "playlists", id));
  }

  const removeSong = async (sname: string) => {
    const playlistRef = doc(db, "playlists", id);
    await updateDoc(playlistRef, {
      songs: songs.filter(song => song.song_name !== sname)
    });
  };

  return (
    <div className={styles.playlist}>
      <Card sx={{ display: 'flex' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography contentEditable={true} component="div" variant="h5">
            {playlist_name}
            {/* <EditIcon className={plstyles.editTitle} fontSize="small" onClick={()=>handleClick}></EditIcon> */}
          </Typography>
          {/* <Popover
            id={pop}
            open={isEdit}
            anchorEl={anchorEl}
            onClose={closePopOver}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
          </Popover> */}
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {des}
          </Typography>
        </CardContent>
        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              {"My favorite"}
              <CloseIcon className={plstyles.closeBtn} onClick={handleClickOpen} >
              </CloseIcon>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Delete this playlist?</DialogTitle>
                <DialogContent>
                  <Alert severity="error">
                    By doing so, you will lose<strong> all the songs and data</strong> stored.
                  </Alert>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button color="warning" onClick={deletePlaylist}>Delete</Button>
                </DialogActions>
              </Dialog>
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
                  <DeleteIcon fontSize="small" className={plstyles.delSongBtn} onClick={() => removeSong(value.song_name)}>
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
                <ExpandMoreIcon></ExpandMoreIcon>
                <ListItemText primary="More" />
                <AddSong id={id} prevSongs={songs}></AddSong>
              </ListItem>
            </List>
          </nav>
        </List>
      </Card>
    </div>
  )
}

export default PlaylistCard;
