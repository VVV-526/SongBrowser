import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import plstyles from "../styles/Playlist.module.css"
import { addDoc, collection, doc, onSnapshot, query, setDoc } from "firebase/firestore";
import { db } from '../pages/firebase';



const addSong = () => {
    const [open, setOpen] = React.useState(false);
    const playlistCollectionRef = collection(db, 'playlists');
    const playlistQuery = query(playlistCollectionRef);
    const [title, setTitle] = React.useState("");
    const [des, setDes] = React.useState("");
    const [count, setAmount] = React.useState(0);

    onSnapshot(playlistQuery,(querySnapshot) => {
        const amount:number = querySnapshot.size;     
         setAmount(amount);
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addToPlaylist = async () => {
        await addDoc(playlistCollectionRef, { playlist_name: title, des: des, pid: count, songs: [] });
        setOpen(false);
    }

    return (
        <div className={plstyles.addBtn}>
            <button className={plstyles.innerBtn} onClick={handleClickOpen} >
                  Add
                </button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add to playlist</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Input keywords to find new songs.
                    </DialogContentText>
                    <Search></Search>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={title=== ""} onClick={addToPlaylist}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default addSong;