import React from 'react';

class Button extends React.Component{
    
    state = {
        style: "button ".concat(this.props.id),
        chosen: false
    }

    componentDidUpdate(prevProps, prevState){
        if (this.props.chosen && !this.state.chosen){
            console.log("I'm here again")
            this.setState(prevState => ({chosen: !prevState.chosen}))
            setTimeout(() => {
                this.setState(prevState => ({
                    style: prevState.style.concat(" fadeOut")
                }))
            },100)
        }
        
    }

    handleButtonClick = () => {
        setTimeout(() => {
            this.setState(prevState => ({
                style: prevState.style.concat(" pressed")
            }))
        }, 100)
    }
    
    render(){
        return (
            <div className={this.state.style} onClick={this.handleButtonClick}>
                
            </div>
        )
    }
    
}

export default Button;