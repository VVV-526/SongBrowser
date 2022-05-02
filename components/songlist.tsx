import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';

type Props = {
    id: number,
    name: string,
    artist: string,
    album: string
}

const SongList = (props: Props) => {
    return (
        <Row className='mt-3 justify-content-center text-center'>
            <Col sm={4}>{props.name}</Col>
            <Col sm={4}>{props.artist}</Col>
            <Col sm={4}>{props.album}</Col>
        </Row>
    )
}


export default SongList;
