import React from 'react';
import Button from "../Buttons/Button/Button"

const Buttons = (props) => {
    return (
        <div>
            <div>
                {props.colors.slice(0,2).map(color => {
                    return <Button key={color} id={color} lastColor={props.lastColor} chosen={color===props.lastColor}/>
                })}
            </div>
            <div>
            {props.colors.slice(2,4).map(color => {
                return <Button key={color} id={color} lastColor={props.lastColor} chosen={color===props.lastColor}/>
            })}
            </div>
        </div>
    )
}

export default Buttons