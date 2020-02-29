
import React from 'react';
import Button from '../Button'

// Just a presentational component which contains the buttons
const Buttons = (props) => {
    return (
        <div>
            <div>
                {props.colors.slice(0,2).map(color => {
                    return(
                        <Button id={color} key={color} sound={props.sounds[color]} handleInput={props.handleInput}/>
                    )
                })}
            </div>
            <div>
                {props.colors.slice(2,4).map(color => {
                    return(
                        <Button id={color} key={color} sound={props.sounds[color]} handleInput={props.handleInput}/>
                    )
                })}
            </div>
        </div>
    )
}

export default Buttons;