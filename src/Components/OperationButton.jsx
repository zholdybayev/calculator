import React from "react";
import { ACTIONS } from "../App";
import '../App.css';

export default function OperationButton({ dispatch, operation, whichclass }) {
    return ( 
        <button 
            onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: { operation }})} 
            className={whichclass}
        >
            {operation}
        </button>
    )
}