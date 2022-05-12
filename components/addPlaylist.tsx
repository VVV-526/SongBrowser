import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import plstyles from "../styles/Playlist.module.css"

const addplaylistCard = () =>{
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={plstyles.topBtn}>
      <Button variant="contained" className={plstyles.addPlaylistBtn} onClick={handleClickOpen}>
        Add Playlist
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create your playlist!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the playlist title.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="title"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default addplaylistCard;