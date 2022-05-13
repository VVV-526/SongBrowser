export type SonglistType = {
    song_name: string,
    artist_name: string,
    album_name: string
}
export type SongWithId = SonglistType & {
    id: string
}

export type SongWithSid = {
    song_name: string | string[] | undefined,
    artist_name: string | string[] | undefined,
    album_name: string | string[] | undefined,
    sid: number
}

export type PlaylistType = {
    pid: number,
    playlist_name: string,
    des: string
}

export type PlaylistWithId = PlaylistType & {
    id: string
}