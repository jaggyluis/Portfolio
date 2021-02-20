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
        active : 1
    }

    onCVClick() {
        window.open('./assets/luis_jaggy_resume.pdf', 'mywindow');
    }

    onLinkedInClick() {
        window.open('https://www.linkedin.com/in/jaggyluis/', 'mywindow');
    }

    componentDidMount() {
        window.addEventListener("resize", debounce(() => {
            this.setState({ width: window.innerWidth, height: window.innerHeight })
        }));
    }

    render() {
        const node = treemap(this.props.data, this.state.width, this.state.height);
        node.data.label = "Luis Jaggy";

        // window.scrollTo({
        //     top: 0,
        //     left: 0,
        //     // behavior: "smooth"
        //   });

        let height = 100;

        if (this.state.width <= 600) {
            height *= Math.ceil(this.state.active / 6) ;
        } else {
            height *= Math.ceil(this.state.active / 12);
        }

        return (
            <div className='Wrapper' 
            style={{
                height : `${height}%`,
            }}>
                <div className="App">
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
                        onNodeSelectionChange={(node) => {
                            if (node && node.data.children) {
                                console.log(node.data.children.length);
                                this.setState({ active : node.data.children.length });
                            } else {
                                this.setState({ active : 1 });
                            }
                        }}
                    />
                </div>
                <div className='Menu'>
                    <div className='menu-item' onClick={this.onCVClick.bind(this)}>resume</div>
                    <div className='menu-item linkedin' onClick={this.onLinkedInClick.bind(this)}>in</div>
                </div>
            </div>
        );
    }

}

export default App;
