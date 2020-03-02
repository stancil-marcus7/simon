import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaAlignRight } from 'react-icons/fa'



const Navbar = ({show}) => {
    const [toggleHamburger, setToggleHamburger] = useState(false);

const handleHamburgerToggle = () => {
    setToggleHamburger(toggleHamburger => !toggleHamburger)
}

const li = [
    {
        link: "#",
        text:"Login"
    },
    {
        link: "#",
        text:"Scoreboard"
    }
];
    return (
        <>
        <div className="navbar">  
            <button onClick={handleHamburgerToggle}>
                <FaAlignRight/>
            </button>
            <ul className={toggleHamburger? "links show-nav" : "links"}>
                {li.map((oblink, i) => {
                    return (<li key={i}><a style={{cursor: "pointer"}}>{oblink.text}</a></li>)
                })}
                
            </ul>
        </div>    
        </>
    )
}

export default Navbar;