import Layout from "../../../../components/layout"
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from "react"
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import styles from "../../../../styles/Home.module.css";
import { useRouter } from 'next/router';
import { app } from "../../../firebase"
import SongToPlaylist from "../../../../components/songToPlaylist";

app;

const PreviewPage = () => {
  const [url, setUrl] = useState("");
  const [lyric, setLyric] = useState("");
  const router = useRouter()
  const { song_name, artist_name, album_name } = router.query;

  useEffect(() => {
    if (router.isReady) {
      const func = async () => {
        const storage = getStorage();
        const ImgRef = ref(storage, `img/${album_name}.png`);
        const ImgUrl = await getDownloadURL(ImgRef);
        setUrl(ImgUrl);
        // const lyricRef = ref(storage, `lyrics/${song_name}.txt`);
        // const lyricURL = await getDownloadURL(lyricRef)
        setLyric('lyrics');
      }
      func();
    }
  }, [router.isReady]);


  return (
    <Layout title="SongPreview">
      <Container className="mt-5 mx-5 py-3 px-5">
        <Row className='justify-content-center text-center'>
          <Col lg={12} xl={4}>
            <Card border="dark" style={{ width: '21rem' }} className="mx-5">
              <Card.Img variant="top" src={url} />
              <Card.Body>
                <Card.Title>{song_name}</Card.Title>
                <Card.Text>
                  {artist_name}
                </Card.Text>
                <SongToPlaylist album_name={album_name} song_name={song_name} artist_name={artist_name} />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={12} xl={6} >
            <h3>{song_name}</h3>
            {lyric}
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default PreviewPage
