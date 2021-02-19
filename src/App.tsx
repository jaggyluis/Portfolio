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
        //     this.setState({ selected: true });
        // }, 300)
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
        // window.addEventListener('mousemove', (ev) => {

        //     const tl = document.getElementById('tl');
        //     const br = document.getElementById('br');

        //     if (tl && br) {
        //         tl.style.width = ev.clientX+'px';
        //         tl.style.height = ev.clientY+'px';
        //         br.style.width = (window.innerWidth - ev.clientX) + 'px';
        //         br.style.height = (window.innerHeight - ev.clientY) + 'px';
        //     }
        // });
    }

    render() {
        const node = treemap(this.props.data, this.state.width, this.state.height);
        node.data.label = "Luis Jaggy";

        return (
            <div className='Wrapper'>
                {/* <div id='tl' className='pointer'></div>
                <div id='br' className='pointer'></div> */}
                <div className="App" onClick={this.onNodeClick.bind(this)}>
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
                <div className='Menu'>
                    <div className='menu-item' onClick={this.onCVClick.bind(this)}>resume</div>
                    <div className='menu-item linkedin' onClick={this.onLinkedInClick.bind(this)}>in</div>
                </div>
            </div>
        );
    }

}

export default App;
