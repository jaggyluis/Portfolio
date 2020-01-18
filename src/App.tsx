import React from 'react';
import './App.css';
import { treemap } from './utils/treemap';
import { NodeData } from './model/NodeData';
import { Layout } from './components/Layout/Layout';

function debounce(func: any) {
    var timer: any;
    return function (event: any) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, 500, event);
    };
}

export interface AppProps {
    data: NodeData;
}
class App extends React.Component<AppProps> {

    state = {
        selected: false,
        width : window.innerWidth,
        height : window.innerHeight,
    }

    onNodeClick() {
        this.setState({ selected: true });
    }

    componentDidMount() {
        window.addEventListener("resize", debounce(() => {
            this.setState({ width: window.innerWidth, height: window.innerHeight })
        }));
    }

    render() {
        const node = treemap(this.props.data, this.state.width, this.state.height);
        node.data.label = "Luis Jaggy";

        return (
            <div
                className="App"
                onClick={this.onNodeClick.bind(this)}
                style={{
                    height: '95%',
                    width: '95%',
                    position: 'absolute',
                    marginLeft: '2.5%',
                    // overflow: 'hidden'
                }}
            >
                <Layout
                    width={this.state.width}
                    height={this.state.height}
                    node={node}
                    nodeState={{ selected: this.state.selected }}
                    nodeDepth={0}
                    nodeSiblings={[]}
                    parent={null}
                    parentState={null}
                />
            </div>
        );
    }

}

export default App;
