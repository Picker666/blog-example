import { useState } from "react";

const ReduxExample = () => {
  const handleClick = () => {
    console.log("6666");
  };
  return (
    <div>
      <button onClick={handleClick}>go...</button>
    </div>
  );
};

export default ReduxExample;

function createStore(reducers, initialState, enhance) {
  if (enhance) {
    return enhance(createStore)(reducers, initialState);
  }

  let state = initialState || {};
  let listeners = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducers(state, action);

    listeners.forEach((listener) => {
      listener();
    });

    return action;
  }

  function subscribe(listener) {
    listeners.push(listener);
  }

  return {
    getState,
    dispatch,
    subscribe,
  };
}

function combineReducers(reducers) {
  const finalReducers = { ...reducers };

  return function combination(state, action) {
    let hasChanged = false;
    const newState = {};
    Object.keys(finalReducers).forEach((key) => {
      const reducer = finalReducers[key];
      const preStateForKey = state[key];
      const nextStateForKey = reducer(preStateForKey, action);

      hasChanged = hasChanged || nextStateForKey !== preStateForKey;
      newState[key] = nextStateForKey;
    });

    return hasChanged ? newState : state;
  };
}

function bindActionCreators(actionCreators, dispatch) {
  const boundActionCreators = {};

  Object.keys(actionCreators).forEach((actionCreator) => {
    boundActionCreators[actionCreator] = function (...rest) {
      const action = actionCreator.at.call(this, ...rest);
      dispatch(action);
    };
  });

  return boundActionCreators;
}

function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, initialState) => {
    const store = createStore(reducer, initialState);

    const { getState, dispatch } = store;
    const middlewareChain = middlewares.map((middleware) => middleware({ state: getState }));
    const newDispatcher = middlewareChain.reduceRight((last, crt) => crt(last), dispatch);

    return {
      ...store,
      dispatch: newDispatcher,
    };
  };
}
