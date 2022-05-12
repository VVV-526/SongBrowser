export type SonglistType = {
    song_name: string,
    artist_name: string,
    album_name: string
}
export type SongWithId = SonglistType & {
    id: string
}
