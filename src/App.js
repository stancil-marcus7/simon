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
      gamePattern: [],
      userPattern: [],
      lastColor: "",
      level: 0,
      gameOver: false,
      gameStarted: false,
      userIsWrong: false,
      readyForUserInput: false,
      strictMode: false,
      strictRestart: false,
      sounds: {
        red: new Audio(red),
        blue: new Audio(blue),
        green: new Audio(green),
        yellow: new Audio(yellow),
        wrong: new Audio(wrong)
      },
      pressed: '',
      activeStyle: '',
  }

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
      
      this.state.sounds[randomColor].play();
      this.fadeInFadeOut();

      setTimeout(() => {
        this.setState({
          readyForUserInput: true,
          activeStyle: ''
        })
      }, 500)
    }    

componentDidUpdate = () => {
  // console.log("[Component Did Update]")
  if (this.state.gameOver){
    document.body.style.background = "red";
  } else {
    document.body.style.background = "linear-gradient(to right, #FC466B , #3F5EFB)"
  }
}

fadeInFadeOut = () => {

    this.setState({
      activeStyle: 'fadeOut ',
    })


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

    //Prevent overlapping sounds if user clicks too early
    this.state.sounds[color].pause();
    this.state.sounds[color].currentTime = 0;

    this.setState(() => ({
      userPattern: [...this.state.userPattern, color],
      pressed: color
    }))

    setTimeout(() => {
      this.setState(() => ({
        pressed: '',
      }))
    }, 100)

    this.state.sounds[color].play();
    
    setTimeout(() => {
      let index = this.state.userPattern.length - 1;
      if ((this.state.userPattern[index] !== this.state.gamePattern[index]) && !this.state.strictMode) {
        console.log("Comparing elements")
        this.setState({
          readyForUserInput: false,
        })
        this.verifyUserMoves()
      }

      if ((this.state.userPattern.length === this.state.gamePattern.length) && !this.state.strictRestart) {
        //disable buttons when user finishes turn
        console.log("Not supposed to be here");
        this.verifyUserMoves()
        this.setState({
          readyForUserInput: false,
        });
      }
      
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
      },100)
    } else {
      clearInterval(intervalRepeatSequence);
      
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
