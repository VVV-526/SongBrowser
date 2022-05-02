import Layout from "../components/layout"
import Search from "../components/search"
import Heading from "../components/heading"
import { Row, Col } from 'react-bootstrap';
import { useRouter } from "next/router";

const FilterPage = () => {
  const router = useRouter();
  return (
    <Layout title="Filterlist">
      <Search></Search>
      <Heading></Heading>
      <Row className='mt-3 justify-content-center text-center'>
        <Col sm={4} ><span onClick={() => router.push('/preview')}>Malibu</span></Col>
        <Col sm={4}>Miley Cyrus</Col>
        <Col sm={4}>Younger Now</Col>
      </Row>
      <Row className='mt-3 justify-content-center text-center'>
        <Col sm={4}>Party In The U.S.A</Col>
        <Col sm={4}>Miley Cyrus</Col>
        <Col sm={4}>Party In The U.S.A - Single</Col>
      </Row>
      <Row className='mt-3 justify-content-center text-center'>
        <Col sm={4}>The Climb</Col>
        <Col sm={4}>Miley Cyrus</Col>
        <Col sm={4}>Hannah Montana</Col>
      </Row>
      <Row className='mt-3 justify-content-center text-center'>
        <Col sm={4}>We Can't Stop</Col>
        <Col sm={4}>Miley Cyrus</Col>
        <Col sm={4}>Bangerz(Deluxe Edition)</Col>
      </Row>
    </Layout>
  )
}

export default FilterPage
