import React from "react";
import { createStore, combineReducers } from "redux";
import reducers from "../../src/reducers/reducers.js";

export const store = createStore(
  combineReducers({
    state: reducers
  })
);
