import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { db } from "../pages/firebase"
import { collection, onSnapshot, query, doc, updateDoc, where } from "firebase/firestore"
import { useState, useEffect } from "react"
import { PlaylistType, PlaylistWithId, SongWithSid } from "../types"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useAuth } from "../components/auth/AuthUserProvider"
import SelectorWithUser from "../components/selectorWithUser"

type Props = {
    readonly album_name: string | string[] | undefined,
    readonly song_name: string | string[] | undefined,
    readonly artist_name: string | string[] | undefined,
}

const SongToPlaylist = ({ album_name, song_name, artist_name }: Props) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [playlists, setPlaylists] = useState<PlaylistWithId[]>([]);
    const { user } = useAuth()
    const playlistQuery = query(
        collection(db, 'playlists'),
        where("owner", "==", "default"))

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event: SelectChangeEvent) => {
        setValue((event.target as HTMLInputElement).value);
    };

    // Add Songs to Playlist Database
    const handleAdd = () => {
        if (value === "") return
        const selectedSongs = playlists.filter(playlist => playlist.id == value);
        const addedSong: SongWithSid = {
            album_name: album_name,
            song_name: song_name,
            artist_name: artist_name,
            sid: selectedSongs[0].songs.length,
        }
        const playlistRef = doc(db, "playlists", `${value}`);
        selectedSongs[0].songs.push(addedSong)
        console.log(selectedSongs[0].songs)
        const addSong = async () => {
            await updateDoc(playlistRef, {
                songs: selectedSongs[0].songs
            });
        }
        addSong();
        setOpen(false);
        setValue("");
    }

    // Read Data
    useEffect(() => {
        const unsubscribe = onSnapshot(playlistQuery, (querySnapshot) => {
            const plData: PlaylistWithId[] = querySnapshot.docs.map(
                (doc) => ({ ...doc.data() as PlaylistType, id: doc.id } as PlaylistWithId)
            );
            console.log(plData);
            setPlaylists(plData);
        })
        return unsubscribe
    }, [])

    // Custom styles
    const theme = createTheme({
        typography: {
            fontFamily: ['Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
                'Lucida Sans Unicode', 'Verdana', 'sans-serif'].join(','),
        },
        palette: {
            primary: {
                main: '#0097a7',
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Button variant="outlined" size="small" onClick={handleClickOpen}>
                <Typography>Add to playlist</Typography>
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Choose a playlist</DialogTitle>
                <DialogContent>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 170 }}>
                        <InputLabel id="playlisy-select-label">Playlist</InputLabel>
                        {user ?
                            <SelectorWithUser></SelectorWithUser>
                            : <Select
                                labelId="playlist-select-label"
                                id="playlist-select"
                                value={value}
                                label="Playlist"
                                onChange={handleChange} >
                                {playlists.map((data) => {
                                    return (
                                        <MenuItem key={data.id} value={data.id}>{data.playlist_name}</MenuItem>
                                    )
                                })}
                            </Select>}
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAdd}>Add to Playlist</Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    )
}

export default SongToPlaylist;