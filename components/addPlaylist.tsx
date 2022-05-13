import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import plstyles from "../styles/Playlist.module.css"
import { addDoc, collection, onSnapshot, query} from "firebase/firestore";
import { db } from '../pages/firebase';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from "./auth/AuthUserProvider"

const addplaylistCard = () => {
    const { user } = useAuth()
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

    const createPlaylist = async () => {
        await addDoc(playlistCollectionRef, { playlist_name: title, des: des, pid: count, songs: [], owner:user!.email!});
        setOpen(false);
    }

    const changeTitle = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setTitle(event.target.value);
      };

    const changeDes = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setDes(event.target.value);
      };

    return (
        <div className={plstyles.topBtn}>
            <button className={plstyles.addPlBtn} onClick={handleClickOpen}>
                <AddIcon></AddIcon>
                Add Playlist
            </button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create your playlist!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter your new playlist title and description.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Title"
                        type="title"
                        value={title}
                        onChange={changeTitle}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Description"
                        type="description"
                        value={des}
                        onChange={changeDes}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={title=== ""} onClick={createPlaylist}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default addplaylistCard;