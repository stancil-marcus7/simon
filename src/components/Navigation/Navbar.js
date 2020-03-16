import React, {useState, useEffect} from 'react';
import AppContext from '../../context/app-context'
import axios from '../../axios';
import { FaAlignRight } from 'react-icons/fa'

const Navbar = React.memo(({showScoreModal, showLoginModal}) => {
    
    const [loggedIn, setLoggedIn] = useState('false')
    const [username, setUsername] = useState('')
    const [regScore, setRegScore] = useState(0);
    const [strictScore, setStrictScore] = useState(0);

    useEffect(() => {
        axios.get("/loggedIn")
            .then(response => {
                if (response.data === true) {
                    setLoggedIn(true)
                    console.log('logged in')
                } else {
                    setLoggedIn(false)
                    console.log(response.data)
                }
            }, error => {
                console.log(error, "could not retrieve logged in status")
            })
    //         .then(() => {
    //             axios.get("user")
    //                 .then(response => {
    //                     const player = response.data;
    //                     setUsername(player.username || player.facebookDisplayName || player.googleDisplayName || player.nickName)
    //                     setRegScore(player.regularModeScore)
    //                     setStrictScore(player.strictModeScore)
    //                 })
    //         }  
    //         )
    })

    const [toggleHamburger, setToggleHamburger] = useState(false);

    const handleHamburgerToggle = () => {
        setToggleHamburger(toggleHamburger => !toggleHamburger)
    }

    const handleLogOut = () => {
        axios.get("/logout")
            .then(response => {
                console.log(response, 'successfully logged out')
                setLoggedIn(false);
            }, error => {
                console.log(error, 'could not log out')
            })
    }

    const handleCheck = () => {
        axios.get('/loggedIn')
        .then(response => {
            console.log(response.data)
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
                {loggedIn ?
                <>
                <li>{username}</li>
                <li>{regScore}</li>
                <li>{strictScore}</li></> : null}
                {loggedIn ? <li onClick={handleLogOut} style={{cursor: "pointer"}}>Log Out</li> : <li onClick={showLoginModal} style={{cursor: "pointer"}}>Login</li>}
                <li onClick={showScoreModal} style={{cursor: "pointer"}}>Scoreboard</li>
            </ul>


            
        </div>    
        </>
    )
})

export default Navbar;