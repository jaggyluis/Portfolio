import React from 'react';
import './App.css';
import { treemap } from './utils/treemap';
import { NodeData } from './model/NodeData';
import LinkedIn from './assets/images/linkedIn-icon.png';
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
        // setTimeout(() => {
            this.setState({ selected: true });
        // }, 300)
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
                    marginTop: '1%',
                    marginLeft: '2.5%',
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
                <div
                    style={{
                        height : '5%',
                        width : '5%',
                        position : 'absolute',
                        top : '100%',
                    }}
                >
                {/* <img
                    style={{
                        width : '100%',
                        height : '100%',
                    }} 
                    src={LinkedIn} 
                /> */}
                </div>
            </div>
        );
    }

}

export default App;
