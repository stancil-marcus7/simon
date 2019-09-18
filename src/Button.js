import React from 'react';

const Button = (props) => {
    return (
        <div className={props.className} onClick={props.onClick}></div>
    )
}

export default Button;