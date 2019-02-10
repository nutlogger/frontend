import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import rootReducer from './reducers';

import { Root } from "./views/root";

import './styles/main.css'

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById("root")
);