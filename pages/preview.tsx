import Layout from "../components/layout"
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

const PreviewPage = () => {
  return (
    <Layout title="SongPreview">
      <Container className="mt-5 mx-5 py-3 px-5">

        <Row className='justify-content-center text-center'>
          <Col sm={4} >
            <Card border="dark" style={{ width: '21rem' }} className="mx-5">
              <Card.Img variant="top" src="img/malibu.png" />
              <Card.Body>
                <Card.Title>Malibu</Card.Title>
                <Card.Text>
                  Miley Cyrus
                </Card.Text>
                <Button variant="secondary" size="sm">Add to playlist</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={6} >
            <h3>Malibu</h3>
            <p>I never came to the beach or stood by the ocean</p>
            <p>I never sat by the shore under the sun with my feet in the sand</p>
            <p>But you brought me here and I'm happy that you did</p>
            <p>'Cause now I'm as free as birds catching the wind</p>
            <p>I always thought I would sink, so I never swam</p>
            <p>I never went boatin', don't get how they are floatin'</p>
            <p>And sometimes I get so scared of what I can't understand</p>
            <p>But here I am</p>
            <p>Next to you</p>
            <p>The sky is more blue</p>
            <p>In Malibu</p>
            <p>Next to you</p>
            <p>In Malibu</p>
            <p>Next to you</p>
            <p>We watched the sun go down as we were walking</p>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default PreviewPage
