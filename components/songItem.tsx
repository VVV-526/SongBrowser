import React from "react"
import { Row, Col, Button } from 'react-bootstrap';
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { SongWithId } from "../types"

type Props = {
    readonly song: SongWithId
}

const SongItem = ({ song: { song_name, artist_name, album_name } }: Props) => {
    const router = useRouter();
    return (
        <Row className='mt-3 justify-content-center text-center'>
            <Col sm={4} ><Button variant="outline-success" className={styles.songName} onClick={() => router.push(`/preview/${song_name}/${artist_name}/${album_name}`)}>{song_name}</Button></Col>
            <Col sm={4}>{artist_name}</Col>
            <Col sm={4}>{album_name}</Col>
        </Row>
    )
}


export default SongItem;