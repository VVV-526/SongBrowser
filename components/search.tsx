import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Form, Col, Button } from 'react-bootstrap';
import { useRouter } from "next/router";

const Search = () => {
    const router = useRouter();
    return (
        <Form>
            <Row className="align-items-center justify-content-center mt-4">
                <Col sm={6} className="my-1">
                    <Form.Label htmlFor="inlineFormInputName" visuallyHidden>
                        Name
                    </Form.Label>
                    <Form.Control id="inlineFormInputName" placeholder="Miley Cyrus" />
                </Col>
                <Col xs="auto" className="my-1">
                    <Button variant="warning" onClick={() => router.push('/filterlist')}>Search</Button>
                </Col>
            </Row>
        </Form>
    )
}

export default Search;