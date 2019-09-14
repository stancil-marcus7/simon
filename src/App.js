import React from 'react';
import './App.css';
import './styles/styles.scss';
import Buttons from "./Buttons/Buttons"
import Header from "../src/Header/Header"

class App extends React.Component{

  state={
      colors: ["red","blue","green","yellow"],
      gamePattern: [],
      userPattern: [],
      lastColor: "",
      gameMessage: "",
      level: 0,
      gameOver: false
  }

  componentDidMount = () => {
    console.log("I'm here")
    this.setState(() => ({gameMessage: "Please click background to start"}));
  }

  // handleCheckPattern = () => {
  //   if (this.state.gamePattern === this.state.userPattern){
  //     this.handleRandomPattern();
  //   } else {
  //     this.setState(prevState => ({gameOver: !prevState.gameOver}))
  //   }
  // }

  handleRandomPattern = () => {
    let randomNum = Math.floor(Math.random() * 4);
    this.setState(prevState => ({gamePattern: [...prevState.gamePattern, this.state.colors[randomNum]],
                                level: prevState.level + 1,
                                lastColor: this.state.colors[randomNum]}));
  }

  handleEndGame(){
    this.setState(() => ({gamePattern: [],
                                userPattern: [],
                                gameOver: "Wrong button. Game over",
                                level: 0}));
  }

  render(){
    return(
      <div className={!this.state.gameOver ? "gameboard" : "red"} onClick={this.state.level === 0 ? this.handleRandomPattern : null}>
          <Header gameMessage={this.state.gameMessage} level={this.state.level}/>
          <div>
            <Buttons colors={this.state.colors} lastColor={this.state.lastColor}/>
          </div>
      </div>
    )
  }
}

export default App;
