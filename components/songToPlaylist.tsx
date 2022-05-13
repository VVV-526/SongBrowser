import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { db } from "../pages/firebase"
import { collection, onSnapshot, query, doc, getDoc } from "firebase/firestore"
import { useState, useEffect } from "react"
import { PlaylistType, PlaylistWithId, SongWithSid } from "../types"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';


const playlistCollectionRef = collection(db, 'playlists');
const playlistQuery = query(playlistCollectionRef);

type Props = {
    readonly album_name: string | string[] | undefined,
    readonly song_name: string | string[] | undefined,
    readonly artist_name: string | string[] | undefined,
}

const SongToPlaylist = ({ album_name, song_name, artist_name }: Props) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [playlists, setPlaylists] = useState<PlaylistWithId[]>([]);;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    // Add Songs to Playlist Database
    const handleAdd = () => {
        if (value === "") return
        const addedSong: SongWithSid = {
            album_name: album_name,
            song_name: song_name,
            artist_name: artist_name,
            sid: 3,
        }
        const playlistRef = doc(db, "playlists", `${value}`);
        const createTask = async () => {
            const docSnap = await getDoc(playlistRef);
            const currentSongs = docSnap.data();
            // zheli!!
            console.log(currentSongs);
        }
        createTask();
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
                    <FormControl>
                        <FormLabel id="playlist-radio-buttons-group"></FormLabel>
                        <RadioGroup
                            name="playlist-radio-buttons-group"
                            value={value}
                            onChange={handleChange}>
                            {playlists.map((data) => {
                                return (
                                    <FormControlLabel control={<Radio />} label={data.playlist_name} key={data.id} value={data.id}></FormControlLabel>
                                )
                            })}
                        </RadioGroup>
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