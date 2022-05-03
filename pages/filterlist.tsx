import Layout from "../components/layout"
import Search from "../components/search"
import Heading from "../components/heading"
import { Row, Col, Button } from 'react-bootstrap';
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css"

const FilterPage = () => {
  const router = useRouter();
  return (
    <Layout title="Filterlist">
      <Search></Search>
      <Heading></Heading>
      <Row className='mt-3 justify-content-center text-center' >
        <Col sm={4} ><Button variant="outline-success" className={styles.songName} onClick={() => router.push('/preview')}>Malibu</Button></Col>
        <Col sm={4}>Miley Cyrus</Col>
        <Col sm={4}>Younger Now</Col>
      </Row>
      <Row className='mt-3 justify-content-center text-center'>
        <Col sm={4}><Button variant="outline-success" className={styles.songName} onClick={() => router.push('/notfound')}>Party In The U.S.A</Button></Col>
        <Col sm={4}>Miley Cyrus</Col>
        <Col sm={4}>Party In The U.S.A - Single</Col>
      </Row>
      <Row className='mt-3 justify-content-center text-center'>
        <Col sm={4}><Button variant="outline-success" className={styles.songName} onClick={() => router.push('/notfound')}>The Climb</Button></Col>
        <Col sm={4}>Miley Cyrus</Col>
        <Col sm={4}>Hannah Montana</Col>
      </Row>
      <Row className='mt-3 justify-content-center text-center'>
        <Col sm={4}><Button variant="outline-success" className={styles.songName} onClick={() => router.push('/notfound')}>We Can't Stop</Button></Col>
        <Col sm={4}>Miley Cyrus</Col>
        <Col sm={4}>Bangerz(Deluxe Edition)</Col>
      </Row>
    </Layout>
  )
}

export default FilterPage
