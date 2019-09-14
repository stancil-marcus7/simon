import React from 'react';

const Header = (props) => (
    <div>
        {props.level === 0 ? <h1 className="header">{props.gameMessage}</h1> : <h1 className="header">{"Level: " + props.level}</h1> }   
    </div>
    
)

export default Header;