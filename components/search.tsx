import React from "react"
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useRouter } from "next/router";
import { useState, ChangeEvent } from 'react';
import styles from "../styles/Home.module.css"


const Search = () => {
    const router = useRouter();
    const [input, setInput] = useState('');
    const [validated, setValidated] = useState(false);
    function changeHandler(event: ChangeEvent<HTMLInputElement>) {
        const user_input = event.currentTarget.value;
        if (user_input.length > 0) {
            setValidated(true);
        }
        setInput(user_input);
    }

    return (
        <Form noValidate validated={validated}>
            <Row className="align-items-start justify-content-center mt-4">
                <Col sm={6} className="my-1">
                    <Form.Label htmlFor="inlineFormInputName" visuallyHidden>
                        Name
                    </Form.Label>
                    <Form.Control required type="text" id="inlineFormInputName" value={input} placeholder="Search Artist/Song/Album" onChange={changeHandler} />
                    <Form.Control.Feedback type="invalid">
                        Please enter a fullname. E.g. Taylor Swift
                    </Form.Control.Feedback>
                </Col>
                <Col xs="auto" className="my-1">
                    <Button variant="secondary" className={styles.searchButton} onClick={() => router.push(`/filterlist/${input}`)} disabled={!validated} >Search</Button>
                </Col>
            </Row>
        </Form>
    )
}

export default Search;