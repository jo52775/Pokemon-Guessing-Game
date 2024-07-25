import { useState, useEffect } from "react";
import './Counter.css'

const Counter = (props) => {
    const count = props.count
    
    return(
        <>
        <div className="attemptCounter">
           <label id="label"> Turns:  </label>
           <h2 id="counter"> {count} </h2>
        </div>
        </>
    )




}



export default Counter