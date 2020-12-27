import {useState, useReducer} from 'react';
import {useField} from "react-final-form";

const getkey = ({id}) => `id-${id}`;


const addItem = (state, value) => {
  const key = getkey(value);
  if(!state) {
    return {[key]: value};
  }
  if(value && key) {
    return {...state, [key]: value};
  }

  return state;
};

const removeItem = (state, value) => {
  const key = getkey(value);
  if(value && state[key]) {
    const newState = {...state};
    delete newState[key];
    if(Object.keys(newState).length === 0) {return undefined;}

    return newState;
  }

  return state;
};

const addToTracker = ([name, data], state, { changeValue }) => {
  console.log('addToTracker', data);
  const fieldState = state.formState.values[name];
  changeValue(state, name, value => {
    return addItem(fieldState, data);
  });
}

const removeFromTracker = ([name, data], state, { changeValue }) => {
  console.log('removeFromTracker', data);
  const fieldState = state.formState.values[name];
  changeValue(state, name, value => {
    return removeItem(fieldState, data);
  });
}


export {addToTracker, removeFromTracker};
