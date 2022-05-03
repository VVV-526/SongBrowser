import React from "react"
import { Row, Form, Col, Button } from 'react-bootstrap';
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css"

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
                    <Button variant="secondary" className={styles.searchButton} onClick={() => router.push('/filterlist')}>Search</Button>
                </Col>
            </Row>
        </Form>
    )
}

export default Search;