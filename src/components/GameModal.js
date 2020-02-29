import React, {useState, useEffect} from 'react';
import {Modal, Row, Col, Container, Form, Button} from "react-bootstrap";


const GameModal = (props) => {
    const [signUp, setSignUp] = useState(false)

    useEffect(() => {
        setSignUp(false);
    },[])

    return (
        <div>
            <Modal
            {...props} 
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
                <Modal.Header closeButton> 
                    <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!signUp ? 
                        <Container>
                            <Row>
                                <Col>
                                    <a href="/auth/google" class="btn btn-block btn-social btn-google">
                                        <span class="fa fa-google"></span>
                                        Sign in with Facebook
                                    </a>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <a href="/auth/facebook" class="btn btn-block btn-social btn-facebook">
                                        <span class="fa fa-facebook"></span>
                                        Sign in with Facebook
                                    </a>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <a href="/auth/facebook" class="btn btn-block btn-social btn-facebook">
                                        <span class="fa fa-facebook"></span>
                                        Sign in with Facebook
                                    </a>
                                </Col>
                            </Row>
                            <Row>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="username" placeholder="Enter username" name="username"/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Enter password" name="password"/>
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </Row>
                        </Container>
                     :
                        <Container>
                                <Row>
                                    <Col>
                                        <a href="/auth/google" class="btn btn-block btn-social btn-google">
                                            <span class="fa fa-google"></span>
                                            Sign in with Facebook
                                        </a>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <a href="/auth/facebook" class="btn btn-block btn-social btn-facebook">
                                            <span class="fa fa-facebook"></span>
                                            Sign in with Facebook
                                        </a>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <a href="/auth/facebook" class="btn btn-block btn-social btn-facebook">
                                            <span class="fa fa-facebook"></span>
                                            Sign in with Facebook
                                        </a>
                                    </Col>
                                </Row>
                                <Row>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control type="username" placeholder="Enter username" name="username"/>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control type="username" placeholder="Enter username" name="username"/>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Enter password" name="password"/>
                                        </Form.Group>
                                        <Button variant="primary" type="submit">
                                            Submit
                                        </Button>
                                    </Form>
                                </Row>
                            </Container>
                    } 
                </Modal.Body>
                <Modal.Footer>
                    <p onClick={() => setSignUp(false)}>Do you not have an account? Sign Up!</p>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default GameModal;
