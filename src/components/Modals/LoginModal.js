import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Form, Button} from 'react-bootstrap';
import axios from '../../axios'


const LoginModal = ({close, showModal}) => {
    
    const modalClass = showModal ? "modal display-block" : "modal display-none"
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        axios.post('/login')
            .then(() => {
                close();
            }, error => {
                console.log(error, 'failed to login')
            })
    }

    return (
        <div className={modalClass}>
            <section className="modal-main">
                <br></br>
                <button className="close-button" onClick={close}><FontAwesomeIcon icon="times" size="lg"/></button>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="usernameGroup">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username"/>
                    </Form.Group>
                    <Form.Group controlId="passwordGroup">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password"/>
                    </Form.Group>
                        <Button variant="primary" type="submit">Log in</Button>
                    
                </Form>
            </section>
        </div>
    )
}

export default LoginModal;