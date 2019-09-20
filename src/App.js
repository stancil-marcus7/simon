import React from 'react';
import './App.css';
import './styles/styles.scss';
import Button from "./Button"
import red from './sounds/red.mp3'
import blue from './sounds/blue.mp3'
import green from './sounds/green.mp3'
import yellow from './sounds/yellow.mp3'
import wrong from './sounds/wrong.mp3'

var intervalRepeatSequence;

class App extends React.Component{

  state={
      colors: ["red","blue","green","yellow"],
      //the pattern the game generates
      gamePattern: [],
      //the pattern that the user inputs
      userPattern: [],
      //used to indicate the current color in the sequence; used for fade in and fade out animation
      lastColor: "",
      //keeps track of the current level
      level: 0,
      //indicates whether game is over or not
      gameOver: false,
      //indicates if game has started
      gameStarted: false,
      //indicates when the user has input the wrong pattern
      userIsWrong: false,
      //indicates when the game will allow the user to pick colors for their pattern
      readyForUserInput: false,
      //used to track whether strict mode (if the user picks a wrong color the game resets) is on or not
      strictMode: false,
      //used to see whether if a strict restart has occured; allows us to figure out whether the users pattern is incorrect when they
      //get past level 1 
      strictRestart: false,
      sounds: {
        red: new Audio(red),
        blue: new Audio(blue),
        green: new Audio(green),
        yellow: new Audio(yellow),
        wrong: new Audio(wrong)
      },
      //used to add light-up border animation
      pressed: '',
      //used to apply fade in, fade out animation
      activeStyle: '',
  }

  //Occurs when a new pattern is started and when a new color is added to the game pattern
  handleNewSequence = () => {
    console.log("[Handle New Sequence]")
    let randomColor = this.state.colors[Math.floor(Math.random() * 4)];

    const currentLevel = this.state.gameStarted ? this.state.level : this.state.level + 1;

    //Adding new color to game pattern
    this.setState(() => ({
      gamePattern: [...this.state.gamePattern, randomColor],
      lastColor: randomColor,
      level: currentLevel,
      gameStarted: true
    }));
      

      this.state.sounds[randomColor].pause();
      this.state.sounds[randomColor].currentTime = 0;
      
      this.fadeInFadeOut();
      this.state.sounds[randomColor].play();
      //used for prevent user from picking colors while the sequence is being shown to them
      setTimeout(() => {
        this.setState({
          readyForUserInput: true,
          activeStyle: ''
        })
      }, 500)
    }    

//when the user picks an incorrect color, the background will change to red until this.state.gameOver is false ahain
componentDidUpdate = () => {
  if (this.state.gameOver){
    document.body.style.background = "red";
  } else {
    document.body.style.background = "linear-gradient(to right, #FC466B , #3F5EFB)"
  }
}

//handles the fade in and fade out animations when the user is being shown the sequence they must replicate
fadeInFadeOut = () => {

    this.setState({
      activeStyle: 'fadeOut ',
    })

  //after half a second the fade in animation will occur
  setTimeout(() => {
    this.setState({
      activeStyle: 'fadeIn ',
      lastColor: ''
    })
  }, 500)
}
  
handleUserInput(color){
  console.log("[handleUserInput]" + this.state.readyForUserInput)
  if (this.state.readyForUserInput){

    //prevents overlapping sounds if user clicks too early
    this.state.sounds[color].pause();
    this.state.sounds[color].currentTime = 0;

    this.setState(() => ({
      userPattern: [...this.state.userPattern, color],
      pressed: color
    }))

    //the light up animation is turned off .10 seconds after the user picks a color
    setTimeout(() => {
      this.setState(() => ({
        pressed: '',
      }))
    }, 100)

    this.state.sounds[color].play();
    
    setTimeout(() => {
      let index = this.state.userPattern.length - 1;
      //compares elements in regular mode
      if ((this.state.userPattern[index] !== this.state.gamePattern[index]) && !this.state.strictMode) {
        this.setState({
          readyForUserInput: false,
        })
        this.verifyUserMoves()
      }

      //compares elements in both strict mode and regular mode after user gets first color of pattern correct
      if ((this.state.userPattern.length === this.state.gamePattern.length) && !this.state.strictRestart) {
        //disables buttons when user finishes their turn
        this.verifyUserMoves()
        this.setState({
          readyForUserInput: false,
        });
      }
      
      //used to validate patterns when strict mode is turned on
      if (this.state.strictMode){
        let index = this.state.userPattern.length - 1;
        if (this.state.userPattern[index] != this.state.gamePattern[index])
        {
          this.setState(() => ({
            readyForUserInput: false,
            strictRestart: true
          }))
          this.verifyUserMoves();
        }
      }
    }, 100)
  }
}

//if regular mode is on and the user is incorrect or correct, the sequence will just be replayed;
//the wrongAnswer() function will be used later in repeatSequence to determine whether a new color should
//be added to the sequence or not
verifyUserMoves = () => {
  console.log("[Verified]")
  if (this.state.userPattern.join() === this.state.gamePattern.join()){
    this.setState(prevState => ({
      level: prevState.level + 1,
      userIsWrong: false,
    }))
    this.repeatSequence();
  } else {

    if (this.state.strictMode){
      this.wrongAnswer()
      setTimeout(() => {
        this.resetGame();
      },600)
    } else {
      console.log("Not supposed to be here")
      this.wrongAnswer();
      this.repeatSequence();
    }
  }
}

wrongAnswer = () => {
  console.log('Wrong');
  this.setState(() => ({
    gameOver: true
  }))

  this.state.sounds["wrong"].play();

  //a delay is used to so that the header will return back to "Click me to begin game" or the current level of the game
  //and to return the background to normal
  setTimeout(() => {
    this.setState(() => ({
      gameOver: false,
      userIsWrong: true
    }))
  },500)
}

repeatSequence () {
  console.log("[Repeat Sequence]")
  this.setState(() => ({
    userPattern: [],
  }))

  var index = -1;

  //this will iterate through the colors and use the fadeInFadeOut function to apply the animations
  intervalRepeatSequence = setInterval(() => {
    index++;
    this.setState(() => ({
      lastColor: ''
    }))

    if (index <= this.state.gamePattern.length -1){
      let currentColor = this.state.gamePattern[index];

      setTimeout(()=> {
        this.setState(() => ({
          lastColor: currentColor
        }))
        this.state.sounds[currentColor].play();
        this.fadeInFadeOut();
      },500)
    } else {
      //makes sure the current iteration won't coincide with the next
      clearInterval(intervalRepeatSequence);
      
      //if the user isn't wrong a new color is added to the game pattern
      if(!this.state.userIsWrong){
        setTimeout(()=>{
          this.handleNewSequence();
        },100)
      }

      if (this.state.userIsWrong) {
        this.setState({
          readyForUserInput: true,
        })
      }
    }

  },1000)
}

//resets the game
resetGame = () => {
  console.log("[Reset Game]")
  clearInterval(intervalRepeatSequence);
  this.setState(() => ({
      gamePattern: [],
      userPattern: [],
      lastColor: "",
      level: 0,
      gameStarted: false,
      userIsWrong: false,
      readyForUserInput: false,
      activeStyle: '',
      strictRestart: false
  }))
}

//turns on strict mode
handleStrictToggle = () => {
  console.log("[Toggle Strict]")
  this.resetGame();
  this.setState(prevState => ({
    strictMode: !prevState.strictMode
  }))
}

  render(){
    return(
      <div 
        className={!this.state.readyForUserInput && this.state.level > 0 ? "pointer-events-disabled" : null}>
          <h1 
            className="header"
            onClick={this.state.level === 0 ? this.handleNewSequence : null}>{!this.state.gameStarted && this.state.level === 0 ? "Click me to begin game" : this.state.gameStarted && this.state.gameOver ? "Wrong. Please try again" : this.state.level > 0 ? "Level: " + this.state.level : null}</h1>
          <p 
            className={!this.state.strictMode ? "subheader" : "subheaderClicked"} 
            onClick={this.handleStrictToggle}>Strict Mode</p>
          <p className={"subheader"} onClick={this.resetGame}>Reset</p>
          <div>
            <div>
            <Button 
              id="red"
              className={this.state.lastColor === "red" ? 
                this.state.activeStyle + "red button pointer-events-disabled" : 
                  !this.state.readyForUserInput ? 
                    "red button pointer-events-disabled" : 
                      this.state.pressed === "red" ?
                      "red button pressed" : "red button"}
              onClick={() => this.handleUserInput("red")}/> 
            <Button 
              id="blue"
              className={this.state.lastColor === "blue" ? 
                this.state.activeStyle + "blue button pointer-events-disabled" : 
                  !this.state.readyForUserInput ? "blue button pointer-events-disabled" : 
                    this.state.pressed === "blue" ?
                      "blue button pressed" : "blue button"}
              onClick={() => this.handleUserInput("blue")}/>
            </div>
            <div>
            <Button 
              id="green"
              className={this.state.lastColor === "green" ? 
                this.state.activeStyle + "green button pointer-events-disabled" : 
                  !this.state.readyForUserInput ? "green button pointer-events-disabled" : 
                  this.state.pressed === "green" ?
                  "green button pressed" : "green button"}
              onClick={() => this.handleUserInput("green")}/>
            <Button 
              id="yellow"
              className={this.state.lastColor === "yellow" ? 
                this.state.activeStyle + "yellow button pointer-events-disabled" : 
                  !this.state.readyForUserInput ? "yellow button pointer-events-disabled" : 
                  this.state.pressed === "yellow" ?
                  "yellow button pressed" : "yellow button"}
              onClick={() => this.handleUserInput("yellow")}/>
            </div>
          </div>
      </div>
    )
  }
}

export default App;
