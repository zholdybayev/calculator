import React from "react";
import { ACTIONS } from "../App";
import '../App.css';

export default function DigitButton({ digit, dispatch, classzero }) {
    return ( 
        <button 
            onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, payload: { digit }})} 
            className={classzero}
        >
            {digit}
        </button>
    )
}