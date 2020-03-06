import React, {useState, useEffect} from 'react';
import axios from '../../axios';
import { FaAlignRight } from 'react-icons/fa'

const Navbar = ({showScoreModal, showLoginModal}) => {
    const [loggedIn, setLoggedIn] = useState('true')

    useEffect(() => {
        axios.get("/loggedIn")
            .then(response => {
                if (response.body === true) {
                    setLoggedIn(true)
                } else {
                    setLoggedIn(false)
                }
            }, error => {
                console.log(error, "could not retrieve logged in status")
            })
    },[])

    const [toggleHamburger, setToggleHamburger] = useState(false);

    const handleHamburgerToggle = () => {
        setToggleHamburger(toggleHamburger => !toggleHamburger)
    }

    const handleLogOut = () => {
        axios.get("/")
            .then(response => {
                console.log(response, 'successfully logged out')
            }, error => {
                console.log(error, 'could not log out')
            })

    }

    return (
        <>
        <div className="navbar">  
            <button className="toggleMenuButton" onClick={handleHamburgerToggle}>
                <FaAlignRight/>
            </button>
            
            <ul className={toggleHamburger? "links show-nav" : "links"}>
                {/* {li.map((oblink, i) => {
                    return (<li key={i}><a style={{cursor: "pointer"}}>{oblink.text}</a></li>)
                })} */}
                {loggedIn ? <li onClick={handleLogOut} style={{cursor: "pointer"}}>Log Out</li> : <li onClick={showLoginModal} style={{cursor: "pointer"}}>Login</li>}
                <li onClick={showScoreModal} style={{cursor: "pointer"}}>Scoreboard</li>
            </ul>
            
        </div>    
        </>
    )
}

export default Navbar;