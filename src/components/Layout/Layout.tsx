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
    nodeDepth: number;
    nodeSiblings: Node[];
    parent: Node | null;
    parentState: NodeState | null;
    onChildClick?: (child: Node) => void;
}
export interface LayoutState {
    selectedChildId: string | null;
    transitionDuration: number;
    width: number;
    height: number;
}
export class Layout extends React.Component<LayoutProps> {

    container: HTMLElement | null = null;
    layout: Node = treemap({ label: '_', type: 'dir', id: '_' }, 100, 100);

    state: LayoutState = {
        width: window.innerWidth,
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
                this.setState({ width: window.innerWidth, height: window.innerHeight })
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

            this.layout = treemap(nodeData, this.state.width, this.state.height);
            this.state.selectedChildId = null;
        }
    }

    getTransitionDuration() {
        return this.state.transitionDuration;
    }

    getStyle(): React.CSSProperties {
        return {
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            flexDirection: 'column',
            zIndex: 1,
            display: this.props.nodeState.hidden ? 'none' : 'flex',
            margin: '-1px',
            border: '1px solid rgba(100,100,100,0.05)'
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
            transition: this.getTransitionDuration() + 'ms',
            opacity: this.getChildOpacity(child),
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

    getChildOpacity(child: Node) {
        return this.isChildSelected(child) || this.areNoChildrenSelected() ? 1 : 0;
    }

    getChildDisplay(child: Node) {
        if (this.isChildSelected(child) || this.areNoChildrenSelected()) return 'visible';
        return 'none';
    }

    getChildState(child: Node): NodeState {
        return {
            selected: this.isChildSelected(child),
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

    getHeaderStyle(): React.CSSProperties {
        return {
            display: this.props.nodeState.selected ? 'flex' : 'none',
            flexWrap: 'wrap',
            paddingBottom: '10px',
        }
    }

    getHeaderNodeStyle(isSibling: boolean = false): React.CSSProperties {

        const d = this.props.nodeDepth * 10
        const h = 40 - d;

        return {
            position: 'relative',
            fontWeight: isSibling ? 'lighter' : 'bolder',
            paddingRight: '10px',
            fontSize: h + 'px',
            textTransform: 'uppercase',
            mixBlendMode: 'overlay',
            color: isSibling ? 'lightgrey' : 'black',
            opacity: this.props.nodeState.selected ? 1 : 0,
        }
    }

    getHeader() {
        if (!this.props.parentState || (this.props.parentState &&
            this.props.parentState.selected &&
            this.props.node.data.type === 'dir')) {
            return (
                <div className='layout-header' style={this.getHeaderStyle()}>
                    <div className='layout-header-node' style={this.getHeaderNodeStyle()}>{this.props.node.data.label}</div>
                    {
                        this.state.width < 600 ? undefined :
                            this.props.nodeSiblings.map(sibling => {
                                if (sibling.data.id !== this.props.node.data.id) {
                                    return (
                                        <div
                                            className='layout-header-node'
                                            key={sibling.data.id}
                                            style={this.getHeaderNodeStyle(true)}>
                                            {"/ " + sibling.data.label}
                                        </div>
                                    )
                                } else {
                                    return undefined
                                }
                            })
                    }
                </div>
            )
        } else return undefined;
    }

    getChildrenStyle(): React.CSSProperties {
        return {
            position: 'relative',
            height: '100%',
            width: '100%',
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
                        nodeDepth={this.props.nodeDepth + 1}
                        nodeSiblings={this.layout.children || []}
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
                {this.getHeader()}
                <div
                    className='layout-children'
                    style={this.getChildrenStyle()}
                >
                    {this.getChildren()}
                    {
                        this.props.node.data.type === 'dir' ?
                            <LayoutOverlay
                                node={this.props.node}
                                nodeState={this.props.nodeState}
                                nodeDepth={this.props.nodeDepth}
                                nodeSiblings={this.props.nodeSiblings}
                                parent={this.props.parent}
                                parentState={this.props.parentState}
                            />
                            :
                            <LayoutContent
                                node={this.props.node}
                                nodeState={this.props.nodeState}
                                nodeDepth={this.props.nodeDepth}
                                nodeSiblings={this.props.nodeSiblings}
                                parent={this.props.parent}
                                parentState={this.props.parentState}
                            />
                    }


                </div>
                <div
                    style={{
                        position: 'fixed',
                        width : window.innerWidth * 2 + 'px',
                        height : '1px',
                        left: 0,
                        background : 'rgba(100,100,100,0.1)'
                    }}
                >
                </div>
                <div
                    style={{
                        position: 'fixed',
                        width : window.innerWidth * 2 + 'px',
                        height : '1px',
                        left: 0,
                        bottom : '5%',
                        background : 'rgba(100,100,100,0.1)'
                    }}
                >
                </div>
            </div>
        )
    }
}