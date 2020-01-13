import React from 'react';
import './App.css';
import { Layout } from './components/Layout/Layout';
import { treemap } from './utils/treemap';
import { NodeData } from './model/NodeData';

function debounce(func: any) {
    var timer: any;
    return function (event: any) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, 1000, event);
    };
}

export interface AppProps {
    data : NodeData;
}
class App extends React.Component<AppProps> {

    componentDidMount() {
        window.addEventListener("resize", debounce(() => {
            this.forceUpdate();
        }));
    }

    render() {

        const node = treemap(this.props.data, window.innerWidth, window.innerHeight);
        const nodeState = { selected: true }

        return (
            <div
                className="App"
                style={{
                    height: '100%',
                    width: '100%',
                    background: 'lightgrey',
                    position: 'absolute'
                }}
            >
                <Layout
                    node={node}
                    nodeState={nodeState}
                    parent={null}
                    parentState={null}
                />
            </div>
        );
    }

}

export default App;
