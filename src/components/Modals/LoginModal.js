import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoginForm from '../Forms/LoginForm'
import axios from '../../axios'


const LoginModal = React.memo(({close, showModal}) => {
    
    const modalClass = showModal ? "modal display-block" : "modal display-none"
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    

    

    const loginSubmit = e => {
        e.preventDefault();
        const user = {
            username,
            password
        }
        console.log(user)
        axios.post('/login', user)
            .then(response => {
                console.log(response)
                close();
            }, error => {
                console.log(error, 'failed to login')
            })
    }

    const registrationSubmit = e => {
        e.preventDefault();
        const user = {
            email,
            username,
            password
            
        }
        if (error){
            console.log('error')
        } else {
            axios.post('/register', user)
            .then(response => {
                console.log(response)
                close();
            }, error => {
                console.log(error, 'failed to login')
            })
        }
        
    }

    return (
        <div className={modalClass}>
            <section className="modal-main">
                <br></br>
                <button className="close-button" onClick={close}><FontAwesomeIcon icon="times" size="lg"/></button>
                <LoginForm 
                    loginSubmit={loginSubmit}
                    setUsername={setUsername} 
                    setPassword={setPassword} 
                    setEmail={setEmail} 
                    registrationSubmit={registrationSubmit}
                    email={email}
                    password={password}
                    username={username}
                    />
            </section>
        </div>
    )
})

export default LoginModal;