import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { NodeData } from './model/NodeData';
import * as d3 from 'd3';

const PATH = 'data.json';

d3.json(PATH).then((data => {
    if (data) ReactDOM.render(<App data={data as NodeData}/>, document.getElementById('root'));
}))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
