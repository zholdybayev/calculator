import React, { useReducer } from 'react';
import './App.css';
import DigitButton from './Components/DigitButton';
import OperationButton from './Components/OperationButton';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  DELETE: 'delete',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  EVALUATE: 'evaluate',
  DELETE_DIGIT: 'delete-digit',
  CHANGE_MINUSPLUS: 'change-minusplus'
}

function reducer(state, {type, payload}) {
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false
        }
      }

      if(payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if(payload.digit === "," && state.currentOperand == null) {
        return state;
      }
      if(payload.digit === "," && state.currentOperand?.includes(",")) {
        return state;
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }
    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      if(state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation
        }
      }

      if(state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }
    
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null
      }

    case ACTIONS.EVALUATE:
      if(state.operation == null || state.currentOperand == null || state.previousOperand == null) {
        return {
          state
        }
      }

      return {
        ...state,
        overwrite: true,
        operation: null,
        currentOperand: evaluate(state),
        previousOperand: null
      }

    case ACTIONS.CHANGE_MINUSPLUS:
      if(state.currentOperand != null) {
        return {
          ...state,
          currentOperand: state.currentOperand - (state.currentOperand * 2)
        }
      }
    case ACTIONS.CLEAR:
      return {};
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if(isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  switch(operation) {
    case "+":
      computation = prev + current
      break;
    case "-":
      computation = prev - current
      break;
    case "×":
      computation = prev * current
      break;
    case "÷":
      computation = prev / current
      break;
  }

  return computation.toString();
}

function App() {
  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {});

  return (
    <div className="App">
      <div className='calculator'>
        <div className='screen'>
          <div className='previous'>{previousOperand}{operation}</div>
          <div className='current'>{currentOperand}</div>
        </div>
        <button className="span-two first-class" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>C</button>
        <button className="first-class" onClick={() => dispatch({ type: ACTIONS.CHANGE_MINUSPLUS })}>±</button>
        <OperationButton operation="÷" dispatch={dispatch} whichclass="second-class" />
        <DigitButton digit="7" dispatch={dispatch} classzero="third-class"/>
        <DigitButton digit="8" dispatch={dispatch} classzero="third-class"/>
        <DigitButton digit="9" dispatch={dispatch} classzero="third-class"/>
        <OperationButton operation="×" dispatch={dispatch} whichclass="second-class" />
        <DigitButton digit="4" dispatch={dispatch} classzero="third-class"/>
        <DigitButton digit="5" dispatch={dispatch} classzero="third-class"/>
        <DigitButton digit="6" dispatch={dispatch} classzero="third-class"/>
        <OperationButton operation="-" dispatch={dispatch} whichclass="second-class" />
        <DigitButton digit="1" dispatch={dispatch} classzero="third-class"/>
        <DigitButton digit="2" dispatch={dispatch} classzero="third-class"/>
        <DigitButton digit="3" dispatch={dispatch} classzero="third-class"/>
        <OperationButton operation="+" dispatch={dispatch} whichclass="second-class" />
        <DigitButton digit="0" dispatch={dispatch} classzero="third-class span-two"/>
        <DigitButton digit="," dispatch={dispatch} classzero="third-class"/>
        <button className="second-class" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
      </div>
    </div>
  );
}

export default App;
