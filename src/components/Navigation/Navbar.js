import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import Nav from "react-bootstrap/Button";



const Navbar = ({showModal}) => {
    const login = useSelector(state => state.login);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type:'GET_LOGIN'});
    },[dispatch])

    return (
        <Nav>
            <Nav.Item>
                <Nav.Link onClick={!!showModal}>{!login ? "Login" : "Log Out"}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link>Scoreboard</Nav.Link>
            </Nav.Item>
        </Nav>
        
    )
}

export default Navbar;