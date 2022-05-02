import React, { ReactNode } from "react"
import styles from "../styles/Home.module.css"
import { List, ListItem, ListItemButton, ListItemAvatar, ListItemText, Avatar, ListSubheader, Divider, Card, CardContent, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';


type playlistType = {
    playlistName: string
    songs: [songType, songType]
}

type songType = {
    id: number,
    title: string,
    album: string,
    artist: string
}


// const playlistCard = (playlists: songType[]) => {
//     return (
//         <Card sx={{ display: 'flex' }}>
//             <CardContent sx={{ flex: '1 0 auto' }}>
//                 <Typography component="div" variant="h5">
//                     {"Playlist"}
//                 </Typography>
//                 <Typography variant="subtitle1" color="text.secondary" component="div">
//                     {"My favorite"}
//                 </Typography>
//             </CardContent>
//             <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
//                 subheader={
//                     <ListSubheader component="div" id="nested-list-subheader">
//                         Miley's Songs
//                     </ListSubheader>
//                 }>
//                 {playlists.map((value) => {
//                     const labelId = `checkbox-list-secondary-label-${value.id}`;
//                     return (
//                         <ListItem
//                             key={value.id}
//                             secondaryAction={
//                                 <DeleteIcon fontSize="small">
//                                 </DeleteIcon>
//                             }
//                         >
//                             <ListItemButton>
//                                 <ListItemAvatar>
//                                     <Avatar
//                                         alt={`Avatar n°${value.id + 1}`}
//                                         src={`/static/images/avatar/${value.title}.jpg`}
//                                     />
//                                 </ListItemAvatar>
//                                 <ListItemText id={labelId} primary={`${value.title}`} />
//                             </ListItemButton>
//                         </ListItem>
//                     );
//                 })}
//                 <Divider />
//                 <nav aria-label="secondary mailbox folders">
//                     <List>
//                         <ListItem disablePadding>
//                             <ListItemButton>
//                                 <ListItemText primary="More" />
//                             </ListItemButton>
//                         </ListItem>
//                     </List>
//                 </nav>
//             </List>
//         </Card>
//     )
// }

// export default playlistCard;
