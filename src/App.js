import React from 'react';
import './App.css';
import './styles/styles.scss';
import red from './sounds/red.mp3'
import blue from './sounds/blue.mp3'
import green from './sounds/green.mp3'
import yellow from './sounds/yellow.mp3'
import wrong from './sounds/wrong.mp3'
import Buttons from './Buttons/Buttons'
import { connect } from 'react-redux';
import { toggleGameOver, updateLevel, turnOnReadyForUserInput, turnOffReadyForUserInput, toggleSrtictMode, resetGame, updateGamePattern, toggleGameStarted, setActiveStyle, emptyUserPattern, updateLastColor, turnOnUserIsWrong, turnOffUserIsWrong, setLevel } from './actions/actions'

var intervalRepeatSequence;

class App extends React.Component{

  constructor(props){
    super(props)
  }

  state={
      colors: ["red","blue","green","yellow"],
      sounds: {
        red: new Audio(red),
        blue: new Audio(blue),
        green: new Audio(green),
        yellow: new Audio(yellow),
        wrong: new Audio(wrong)
      }
  }

  //Occurs when a new pattern is started and when a new color is added to the game pattern
  handleNewSequence = () => {
    let randomColor = this.state.colors[Math.floor(Math.random() * 4)];

    const currentLevel = this.props.gameStarted ? this.props.level : this.props.level + 1;
   
    //Adding new color to game pattern
    this.props.dispatch(updateGamePattern(randomColor));
    this.props.dispatch(updateLastColor(randomColor));
    this.props.dispatch(setLevel({level: currentLevel}));
    if (!this.props.gameStarted){
      this.props.dispatch(toggleGameStarted());
    }

    this.fadeInFadeOut(randomColor);

    //used for prevent user from picking colors while the sequence is being shown to them
    setTimeout(() => {
      this.props.dispatch(turnOnReadyForUserInput())
    }, 500)
    }    

//when the user picks an incorrect color, the background will change to red until this.state.gameOver is false ahain
componentDidUpdate = () => {
  if (this.props.gameOver){
    document.body.style.background = "red";
  } else {
    document.body.style.background = "linear-gradient(to right, #FC466B , #3F5EFB)"
  }
}

//handles the fade in and fade out animations when the user is being shown the sequence they must replicate
fadeInFadeOut = (color) => {

  this.props.dispatch(setActiveStyle('fadeOut '));

  //after half a second the fade in animation will occur
  setTimeout(() => {
    this.props.dispatch(setActiveStyle('fadeIn '));
    this.props.dispatch(updateLastColor())
  }, 500)
  this.state.sounds[color].play();
}
  
handleInput = () => { 
  let initialCheck = setTimeout(() => {
    let index = this.props.userPattern.length - 1;
    //compares elements in regular mode
    if ((this.props.userPattern[index] !== this.props.gamePattern[index]) && !this.props.strictMode) {
      this.props.dispatch(turnOffReadyForUserInput());
      this.verifyUserMoves();
    }

    // compares elements in both strict mode and regular mode when the user has input all the colors; basically used to check if the user 
    // got the last in the pattern correct, since they've gotten the rest of the pattern correct
    if ((this.props.userPattern.length === this.props.gamePattern.length) && !this.props.strictRestart) {
      //disables buttons when user finishes their turn
        this.props.dispatch(turnOffReadyForUserInput());
        this.verifyUserMoves();
    }
  }, 100)
    
    //used to validate patterns when strict mode is turned on
    setTimeout(() => {
      if (this.props.strictMode){
        let index = this.props.userPattern.length - 1;
        if (this.props.userPattern[index] !== this.props.gamePattern[index])
        {
          // Prevents the initial check from occuring because at this point we know the user has already input the incorrect pattern
          clearTimeout(initialCheck);
          this.props.dispatch(turnOffReadyForUserInput());
          this.verifyUserMoves();
        }
      }
    },50)
}

//if regular mode is on and the user is incorrect or correct, the sequence will just be replayed;
//the userIsWrong property will be used later in repeatSequence to determine whether a new color should
//be added to the sequence or not
verifyUserMoves = () => {
  if (this.props.userPattern.join() === this.props.gamePattern.join()){
    this.props.dispatch(updateLevel());
    this.repeatSequence();
  } else {
    if (this.props.strictMode){
      this.wrongAnswer()
      setTimeout(() => {
        this.resetGame();
      },500)
    } else {
      this.wrongAnswer();
      this.repeatSequence();
    }
  }
}

wrongAnswer = () => {
  this.props.dispatch(toggleGameOver());

  this.state.sounds["wrong"].play();

  //a delay is used to so that the header will return back to "Click me to begin game" or the current level of the game
  //and to return the background to normal
  setTimeout(() => {
    this.props.dispatch(toggleGameOver());
    this.props.dispatch(turnOnUserIsWrong());
  },500)
}

repeatSequence () {
  this.props.dispatch(emptyUserPattern())

  var index = -1;

  //this will iterate through the colors and use the fadeInFadeOut function to apply the animations
  intervalRepeatSequence = setInterval(() => {
    index++;
    this.props.dispatch(updateLastColor());

    if (index <= this.props.gamePattern.length -1){
      let currentColor = this.props.gamePattern[index];

      setTimeout(()=> {
        this.props.dispatch(updateLastColor(currentColor));
        this.fadeInFadeOut(currentColor);
      },100)
    } else {
      //makes sure the current iteration won't coincide with the next
      clearInterval(intervalRepeatSequence);
      
      //if the user isn't wrong a new color is added to the game pattern
      if(!this.props.userIsWrong){
        setTimeout(()=>{
          this.handleNewSequence();
        },100)
      }

      if (this.props.userIsWrong) {
        this.props.dispatch(turnOnReadyForUserInput());
        this.props.dispatch(turnOffUserIsWrong());
      }
    }
  },1000)
}

//resets the game
resetGame = () => {
  clearInterval(intervalRepeatSequence);
  this.props.dispatch(resetGame());
  
}

//turns on strict mode
handleStrictToggle = () => {
  this.resetGame();
  this.props.dispatch(toggleSrtictMode());
}

  render(){
    return(
      <div 
        className={!this.props.readyForUserInput && this.props.level > 0 ? "pointer-events-disabled" : null}>
          <h1 
            className="header"
            onClick={this.props.level === 0 ? this.handleNewSequence : null}>{!this.props.gameStarted && this.props.level === 0 ? "Click me to begin game" : this.props.gameStarted && this.props.gameOver ? "Wrong. Please try again" : this.props.level > 0 ? "Level: " + this.props.level : null}</h1>
          <p 
            className={!this.props.strictMode ? "subheader" : "subheaderClicked"} 
            onClick={this.handleStrictToggle}>Strict Mode</p>
          <p className={"subheader"} onClick={this.resetGame}>Reset</p>
          <div>
            <div>
              <Buttons colors={this.state.colors} sounds={this.state.sounds} handleInput={this.handleInput}/>
            </div>
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      lastColor: state.lastColor,
      readyForUserInput: state.readyForUserInput,
      level: state.level,
      gameStarted: state.gameStarted,
      gamePattern: state.gamePattern,
      userPattern: state.userPattern,
      userIsWrong: state.userIsWrong,
      strictMode: state.strictMode,
      strictRestart: state.strictRestart,
      gameOver: state.gameOver
      
  }
}

export default connect(mapStateToProps)(App);