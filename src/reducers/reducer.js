const simonReduceDefaultState = {
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
    //used to add light-up border animation
    pressed: '',
    //used to apply fade in, fade out animation
    activeStyle: '',
}

export default (state = simonReduceDefaultState, action) => {
    switch (action.type) {
        case 'SET_ACTIVE_STYLE':
            return {
                ...state,
                activeStyle: action.style
            }
        case 'UPDATE_LAST_COLOR':
            return {
                ...state,
                lastColor: action.color
            }
        case 'UPDATE_USER_PATTERN':
            return {
                ...state,
                userPattern: [...state.userPattern, action.color]
            }
        case 'UPDATE_GAME_PATTERN':
            return {
                ...state,
                gamePattern: [...state.gamePattern, action.color]
            }
        case 'TOGGLE_PRESSED':
            return {
                ...state,
                pressed: action.color
            }
        case 'TURN_ON_READY_FOR_USER_INPUT':
            return {
                ...state,
                readyForUserInput: true
            }
        case 'TURN_OFF_READY_FOR_USER_INPUT':
            return {
                ...state,
                readyForUserInput: false
            }
        case 'RESET_GAME':
            return {
                ...state,
                gamePattern: [],
                userPattern: [],
                lastColor: "",
                level: 0,
                gameStarted: false,
                userIsWrong: false,
                readyForUserInput: false,
                activeStyle: '',
                strictRestart: false
            }
        case 'UPDATE_LEVEL':
            return {
                ...state,
                level: state.level + action.level
            }
        case 'TURN_OFF_USER_IS_WRONG':
            return{
                ...state,
                userIsWrong: false
            }
        case 'TURN_ON_USER_IS_WRONG':
                return{
                    ...state,
                    userIsWrong: true
                }
        case 'TOGGLE_STRICT_MODE':
            return {
                ...state,
                strictMode: !state.strictMode
            }
        case 'TOGGLE_GAME_STARTED':
            return {
                ...state,
                gameStarted: !state.gameStarted
            }
        case 'TOGGLE_GAME_OVER':
            return {
                ...state,
                gameOver: !state.gameOver
            }
        case 'EMPTY_USER_PATTERN':
            return {
                ...state,
                userPattern: []
            }
        case 'SET_LEVEL':
            return{
                ...state,
                level: action.level
            }
        default:
            return {
                ...state
            };     
    }
}