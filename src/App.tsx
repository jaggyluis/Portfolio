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
        selected: true,
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
                        paddingTop: '10px',
                        width: '100%',
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
                        right: '0',
                        display: 'flex',
                        padding : '0px 10px'
                    }}
                >
                    <div
                        onClick={() => { window.open('https://www.linkedin.com/in/jaggyluis/', 'mywindow') }}
                        style={{
                            fontWeight: 'bold',
                            fontSize: '18px',
                            cursor: 'pointer',
                            lineHeight: '40px',
                            margin: 'auto',
                            paddingRight: '10px',
                        }}
                    >in</div>
                    <div
                        style={{
                            fontSize: '18px',
                            cursor: 'pointer',
                            lineHeight: '40px',
                            margin: 'auto'
                        }}
                    >resume</div>
                </div>
            </div>
        );
    }

}

export default App;
