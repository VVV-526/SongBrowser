import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import plstyles from "../styles/Playlist.module.css"
import { addDoc, collection, doc, onSnapshot, query, updateDoc } from "firebase/firestore";
import { db } from '../pages/firebase';
import AddIcon from '@mui/icons-material/Add'
import { SonglistType } from '../types';

type songType = {
    sid: number,
    song_name: string,
    album_name: string,
    artist_name: string
}

type Props = {
    id: string,
    prevSongs: songType[],
}

const songRef = collection(db, "songs");

const AddSong = ({ id, prevSongs }: Props) => {
    const [songs, setSongs] = React.useState<SonglistType[]>([])
    const defaultProps = {
        options: songs,
        getOptionLabel: (option: SonglistType) => option.song_name,
    };

    const [open, setOpen] = React.useState(false);
    const playlistCollectionRef = collection(db, 'playlists');
    const playlistQuery = query(playlistCollectionRef);
    const [title, setTitle] = React.useState("");
    const [des, setDes] = React.useState("");
    const [count, setAmount] = React.useState(0);

    const [value, setValue] = React.useState<SonglistType | null>(null);
    const [inputValue, setInputValue] = React.useState('');

    onSnapshot(playlistQuery, (querySnapshot) => {
        const amount: number = querySnapshot.size;
        setAmount(amount);
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addToPlaylist = async () => {
        console.log(value)
        const playlistRef = doc(db, "playlists", `${id}`);
        if (value) {
            const songwithId: songType = {
                song_name: value.song_name,
                album_name: value.album_name,
                artist_name: value.artist_name,
                sid: prevSongs.length

            }
            const newSong = prevSongs.slice();
            newSong.push(songwithId);
            console.log(newSong)
            const addSong = async () => {
                await updateDoc(playlistRef, {
                    songs: newSong
                });
            }
            addSong();
        }
        //await addDoc(playlistCollectionRef, { playlist_name: title, des: des, pid: count, songs: [] });
        setOpen(false);
    }

    // Read song data
    React.useEffect(() => {
        const unsubscribe = onSnapshot(songRef, (querySnapshot) => {
            const songData = querySnapshot.docs.map(
                (doc) => ({ ...doc.data() as SonglistType })
            )
            setSongs(songData);
            console.log(songData)
        })
        return unsubscribe;
    }, [])

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
                    <Autocomplete
                        {...defaultProps}
                        value={value}
                        onChange={(event: any, newValue: SonglistType | null) => {
                            setValue(newValue);
                            console.log(value)
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        id="autocomplete"
                        options={songs}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} variant="standard" />}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addToPlaylist}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddSong;