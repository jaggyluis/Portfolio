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
        width: window.innerWidth,
        height: window.innerHeight,
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
                className='Wrapper'
                style={{
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    position: 'absolute'
                }}
            >
                <div
                    className="App"
                    onClick={this.onNodeClick.bind(this)}
                    style={{
                        height: 'calc(100% - 50px)',
                        top: '10px',
                        width: '100%',
                        position: 'absolute',
                    }}
                >
                    <Layout
                        width={this.state.width}
                        height={this.state.height}
                        node={node}
                        nodeState={{ selected: this.state.selected }}
                        nodeDepth={0}
                        nodeSiblings={[]}
                        nodeSiblingSelectedId={this.state.selected ? node.data.id : null}
                        parent={null}
                        parentState={null}
                    />
                </div>
                <div
                    className='Menu'
                    style={{
                        height: '40px',
                        position: 'absolute',
                        bottom: '0',
                        width: '100%',
                        display: 'flex'
                    }}
                >
                    <img
                        alt='linkedIn'
                        onClick={() => { window.open('https://www.linkedin.com/in/jaggyluis/', 'mywindow') }}
                        style={{
                            // width: 'calc(100% - 20px)',
                            height: 'calc(100% - 20px)',
                            objectFit: 'contain',
                            margin: '10px',
                            opacity: 0.5
                        }}
                        src={LinkedIn}
                    />
                </div>
            </div>
        );
    }

}

export default App;
