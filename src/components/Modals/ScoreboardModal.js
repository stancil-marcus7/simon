import React, {useState, useEffect, useMemo} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import axios from './axios'

const ScoreboardModal = React.memo(({close, showModal}) => {

    const modalClass = showModal ? "modal display-block" : "modal display-none"

    // const [lim, setLim] = useState(10);
    // const [players, setPlayers] = useState([]);

    // useEffect(() => {
    //     axios.get(`/players/?lim=${lim}`)
    //         .then(response => {
    //             setPlayers(response)
    //         }, error => {
    //             console.log(error, "Cannot retrieve players");
    //         })
    // }, [lim])

    // const getMoreScores  = () => {
    //     setLim(lim + 10);
    // }

    // const tableHeader = () => {
    //     return players.map((key, index) => {
    //     return (key === "username" || "regularModeScore" || "strictModeScore" ? <th key={index}>{key.toUpperCase()}</th> : null)
    //     })
    // }

    // const tableData = () => {
    //     return players.map(player => {
    //         return (
    //             <tr>
    //                 <td>{player.username}</td>
    //                 <td>{player.regularModeScore}</td>
    //                 <td>{player.strictModeScore}</td>
    //             </tr>
    //         )
    //     })
        
    // }

    return(
        // <div>
        //     <table>
        //         <tbody>
        //         {players ? 
        //         <Fragment>
        //             <tr>{tableHeader}</tr> 
        //             {tableData} 
        //         </Fragment> : 
        //         <p>See no scores? That's because there aren't any. Be the first to set the bar</p>
        //         }
        //         </tbody>
        //     </table>
        //     <button onClick={getMoreScores}>See more scores</button>
        // </div>
        <div className={modalClass}>
            <section className="modal-main">
                <button className="close-button" onClick={close}><FontAwesomeIcon icon="times" size="lg"/></button>
                    <br></br>
                    This is the modal
                </section>
        </div>
    )
})

export default ScoreboardModal;
