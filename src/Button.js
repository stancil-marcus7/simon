import React from 'react';
import { connect } from 'react-redux';
import { togglePressed } from './actions/actions'
import { updateUserPattern } from './actions/actions'



class Button extends React.Component{

    constructor(props){
        super(props)
    }

    choseColor = () => {
        if (this.props.readyForUserInput){
            this.props.sound.pause();
            this.props.sound.currentTime = 0;
            this.props.dispatch(updateUserPattern(this.props.id))
            this.props.dispatch(togglePressed(this.props.id))
            setTimeout(() => {
                this.props.dispatch(togglePressed())
            },100)
            this.props.sound.play();
            this.props.handleInput();
        }   
    }

    render(){
        return (
            <div className={this.props.lastColor === this.props.id ? 
                this.props.activeStyle + this.props.id + " button pointer-events-disabled" : 
            !this.props.readyForUserInput ? this.props.id + " button pointer-events-disabled" : 
            this.props.pressed === this.props.id ?
            // When you click on the button it will light up and handleInput will be called in App.js and determine how the input should be interpretted
            this.props.id + " button pressed" : this.props.id + " button"} onClick={this.choseColor}></div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        lastColor: state.lastColor,
        activeStyle: state.activeStyle,
        readyForUserInput: state.readyForUserInput,
        pressed: state.pressed
    }
}

export default connect(mapStateToProps)(Button);