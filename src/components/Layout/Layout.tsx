import * as React from 'react';
import { NodeData, NodeState } from '../../model/NodeData';
import { LayoutOverlay } from '../LayoutOverlay/LayoutOverlay';
import { Node } from './../../model/Node';
import { treemap } from './../../utils/treemap';
import { LayoutContent } from '../LayoutContent/LayoutContent';

function debounce(func: any) {
    var timer: any;
    return function (event: any) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, 500, event);
    };
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a: any) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

export interface LayoutProps {
    node: Node;
    nodeState: NodeState;
    parent: Node | null;
    parentState: NodeState | null;
    onChildClick?: (child: Node) => void;
}
export interface LayoutState {
    selectedChildId: string | null;
    transitionDuration: number;
    width : number;
    height : number;
}
export class Layout extends React.Component<LayoutProps> {

    container: HTMLElement | null = null;
    layout: Node = treemap({ label: '_', type: 'dir', id: '_' }, 100, 100);

    state: LayoutState = {
        width : window.innerWidth,
        height: window.innerHeight,
        selectedChildId: null,
        transitionDuration: 600
    }

    componentWillMount() {
        this.update();
    }

    componentWillUpdate() {
        this.update();
    }

    componentDidMount() {
        window.addEventListener("resize", debounce(() => {
            if (this.props.nodeState.selected) {
                this.setState({width : window.innerWidth, height : window.innerHeight})
            }
        }));
    }

    update() {

        if (this.props.nodeState.hidden) {
            this.layout = treemap({ label: '_', type: 'dir', id: '_' }, 100, 100);
            this.state.selectedChildId = null;
        } else {
            const nodeData = Object.assign({}, this.props.node.data);
            nodeData.children = !nodeData.children ? undefined : nodeData.children.filter(child => this.props.parentState?.selected || !child.content)
    
            // for (let i = 0; i < 1; i++) {
            //     nodeData.children?.push({
            //         label: "_",
            //         type: 'data',
            //     })
            // }
    
            // shuffle(nodeData.children || []);
     
            if (this.props.parentState && this.props.parentState.selected && nodeData.children) {
    
                nodeData.children.push({
                    label: this.props.node.data.label,
                    id: '__label__',
                    type: 'data',
                    content: [], //this.props.parent ? ["<<< " + this.props.parent.data.label] : [],
                    weight: 0.5
                })
    
                nodeData.children?.push({
                    label: '_',
                    id: '__filler__',
                    type: 'data',
                    weight: 0.5
                })
            }
    
            this.layout = treemap(nodeData, this.state.width, this.state.height);
            this.state.selectedChildId = null;
        }
    }

    getTransitionDuration() {
        return this.state.transitionDuration;
    }

    getStyle(): React.CSSProperties {

        const v = Math.floor(Math.random() * 30) + 225;
        // const v = Math.floor(Math.random() * 20);

        return {
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            // background: 'rgba(' + v + ',' + v + ',' + v + ',' + 0.5 + ')',
            // border : '0.5px solid rgba(0,0,0,0.05)',
            zIndex: 1,
            display: this.props.nodeState.hidden ? 'none' : '',
        }
    }

    getChildStyle(child: Node): React.CSSProperties {
        return {
            position: 'absolute',
            top: this.getChildTop(child),
            left: this.getChildLeft(child),
            height: this.getChildHeight(child),
            width: this.getChildWidth(child),
            display: this.getChildDisplay(child),
            zIndex: -1,
            transition: this.getTransitionDuration() + 'ms',
            // opacity: this.getChildOpacity(child),
            willChange: 'top, left, height, width, display, opacity'
        }
    }

    getChildTop(child: Node) {
        if (this.isChildSelected(child)) return 0;
        return (100 * child.y0) + "%";
    }

    getChildLeft(child: Node) {
        if (this.isChildSelected(child)) return 0;
        return (100 * child.x0) + "%";
    }

    getChildWidth(child: Node) {
        if (this.isChildSelected(child)) return '100%';
        return (100 * (child.x1 - child.x0)) + "%";
    }

    getChildHeight(child: Node) {
        if (this.isChildSelected(child)) return '100%';
        return (100 * (child.y1 - child.y0)) + "%";
    }

    getChildOpacity(child:Node) {
        return this.isChildSelected(child) || this.areNoChildrenSelected() ? 1 : 0;
    }

    getChildDisplay(child: Node) {
        if (this.isChildSelected(child) || this.areNoChildrenSelected()) return 'visible';
        return 'none';
    }

    getChildState(child: Node): NodeState {
        return {
            selected: this.isChildSelected(child),
            // hidden : this.props.parentState !== null && !this.props.parentState.selected
            hidden: this.props.parent !== null && !this.props.nodeState.selected
        }
    }

    isChildSelected(child: Node) {
        return this.state.selectedChildId === child.data.id;
    }

    setChildSelected(child: Node) {
        this.setState({ selectedChildId: child.data.id })
    }

    areNoChildrenSelected() {
        return this.state.selectedChildId === null;
    }

    onChildClick(child: Node) {
        if (!child.data.content) {
            this.setChildSelected(child);
        }
    }

    getChildren() {
        return this.layout.children ? this.layout.children.map((child) => {
            return (
                <div
                    key={child.data.id}
                    className='layout-child'
                    onClick={() => { this.onChildClick(child); }}
                    style={this.getChildStyle(child)}
                >
                    <Layout
                        parent={this.props.node}
                        parentState={this.props.nodeState}
                        node={child}
                        nodeState={this.getChildState(child)}
                    />
                </div>
            )
        })
            : [];
    }

    render() {
        return (
            <div
                className='layout'
                ref={el => this.container = el}
                style={this.getStyle()}
            >
                {
                    this.props.node.data.type === 'dir' ?
                        <LayoutOverlay
                            node={this.props.node}
                            nodeState={this.props.nodeState}
                            parent={this.props.parent}
                            parentState={this.props.parentState}
                        />
                        :
                        <LayoutContent
                            node={this.props.node}
                            nodeState={this.props.nodeState}
                            parent={this.props.parent}
                            parentState={this.props.parentState}
                        />
                }
                {this.getChildren()}
            </div>
        )
    }
}