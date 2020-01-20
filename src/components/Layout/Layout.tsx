import * as React from 'react';
import { NodeData, NodeState } from '../../model/NodeData';
import { LayoutOverlay } from '../LayoutOverlay/LayoutOverlay';
import { Node } from '../../model/Node';
import { treemap } from '../../utils/treemap';
import { LayoutContent } from '../LayoutContent/LayoutContent';
import './Layout.css';

export interface LayoutProps {
    width: number,
    height: number,
    node: Node;
    nodeState: NodeState;
    nodeDepth: number;
    nodeSiblings: Node[];  
    parent: Node | null;
    parentState: NodeState | null;
    onNodeClick?: (node : Node) => void;
}
export interface LayoutState {
    selectedChildId: string | null;
    visibleChildId : string | null;
    transitionDuration: number;
}
export class Layout extends React.Component<LayoutProps> {

    container: HTMLElement | null = null;
    layout: Node = treemap(this.props.node.data, this.props.width, this.props.height);

    state: LayoutState = {
        selectedChildId: null,
        visibleChildId : null,
        transitionDuration: 300
    }

    componentWillMount() {
        this.update();
    }

    componentWillUpdate() {
        this.update();
    }

    update() {
        this.layout = treemap(this.props.node.data, this.props.width, this.props.height);
        if (!this.props.nodeState.selected) {
            this.state.selectedChildId = null;
            this.state.visibleChildId = null;
        }
    }

    getChildState(child: Node): NodeState {
        return {
            selected: this.isChildVisible(child), //this.isChildSelected(child),
            hidden: this.props.parent !== null && !this.props.nodeState.selected
        }
    }

    isChildVisible(child : Node) {
        return this.state.visibleChildId === child.data.id;
    }

    isChildSelected(child: Node) {
        return this.state.selectedChildId === child.data.id;
    }

    areNoChildrenSelected() {
        return this.state.selectedChildId === null;
    }

    setSelectedChild(child: Node) {
        this.setState({ selectedChildId: child.data.id, visibleChildId: child.data.id })
        // this.setState({ selectedChildId: child.data.id })
        // setTimeout(() => {
        //     this.setState({visibleChildId : child.data.id});
        // }, this.state.transitionDuration * 2)
    }

    clearSelectedChildren() {
        this.setState({selectedChildId : null, visibleChildId : null});
    }

    onChildClick(child: Node | null) {
        if (!child) {
            this.clearSelectedChildren()
        } else {
            if (!child.data.content) {
                this.setSelectedChild(child);
            } 
        }
    }

    getHeaderStyle(): React.CSSProperties {
        return {
            display: this.props.nodeState.selected ? 'flex' : 'none',
            flexWrap: 'wrap',
            marginBottom: '10px',
            borderBottom: '1px solid rgba(100,100,100,0.05)'
        }
    }

    getHeaderNodeStyle(isSibling: boolean = false): React.CSSProperties {

        const s = this.props.width < 600 ? 30 : 40;
        const c = Math.ceil(s / 5)
        const d = this.props.nodeDepth * c
        const h = s - d;

        return {
            position: 'relative',
            fontWeight: isSibling ? 'lighter' : 'bolder',
            paddingRight: '10px',
            fontSize: h + 'px',
            lineHeight: 0.8,
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
                <div className='layout-header' 
                    style={this.getHeaderStyle()}
                    >
                    <div 
                        className='layout-header-node' 
                        onClick={this.clearSelectedChildren.bind(this)}
                        style={this.getHeaderNodeStyle()}>{this.props.node.data.label}
                    </div>
                    {
                        this.props.width < 600 ? undefined :
                            this.props.nodeSiblings.map(sibling => {
                                if (sibling.data.id !== this.props.node.data.id) {
                                    return (
                                        <div
                                            className='layout-header-node'
                                            onClick={(e) => {
                                                if (this.props.onNodeClick) {
                                                    this.props.onNodeClick(sibling);
                                                    e.stopPropagation();
                                                }
                                             }}
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

    getOverlay() {
        return this.props.node.data.type === 'dir' ?
            <LayoutOverlay
                width={this.props.width}
                height={this.props.height}
                node={this.props.node}
                nodeState={this.props.nodeState}
                nodeDepth={this.props.nodeDepth}
                nodeSiblings={this.props.nodeSiblings}
                parent={this.props.parent}
                parentState={this.props.parentState}
            />
            :
            <LayoutContent
                width={this.props.width}
                height={this.props.height}
                node={this.props.node}
                nodeState={this.props.nodeState}
                nodeDepth={this.props.nodeDepth}
                nodeSiblings={this.props.nodeSiblings}
                parent={this.props.parent}
                parentState={this.props.parentState}
            />
    }

    getChildTop(child: Node) {
        if (this.isChildSelected(child)) return '0%';
        return (100 * child.y0) + "%";
    }

    getChildLeft(child: Node) {
        if (this.isChildSelected(child)) return '0%';
        return (100 * child.x0) + "%";
    }

    getChildWidth(child: Node) {
        if (this.isChildSelected(child)) return '100%';
        if (this.areNoChildrenSelected()) return (100 * (child.x1 - child.x0)) + "%";
        return '0%';
    }

    getChildHeight(child: Node) {
        if (this.isChildSelected(child)) return '100%';
        if (this.areNoChildrenSelected()) return (100 * (child.y1 - child.y0)) + "%";
        return '0%';
    }

    getChildOpacity(child: Node) {
        return this.isChildSelected(child) || this.areNoChildrenSelected() ? 1 : 0;
    }

    getChildDisplay(child: Node) {
        if (this.isChildSelected(child) || this.areNoChildrenSelected()) return '';
        return 'none';
    }

    getChildStyle(child: Node): React.CSSProperties {
        return {
            position: 'absolute',
            top: this.getChildTop(child),
            left: this.getChildLeft(child),
            height: this.getChildHeight(child),
            width: this.getChildWidth(child),
            transition: this.state.transitionDuration + 'ms',
            opacity: this.getChildOpacity(child),
            willChange: 'top, left, height, width, opacity'
        }
    }

    getChildrenStyle(): React.CSSProperties {
        return {
            position: 'relative',
            height: '100%',
            width: '100%',
        }
    }

    getChildren() {
        // if (this.props.nodeState.selected) {
        return this.layout.children ? this.layout.children.map((child) => {
            return (
                <div
                    key={child.data.id}
                    className='layout-position'
                    style={this.getChildStyle(child)}
                >
                    <Layout
                        width={this.props.width}
                        height={this.props.height}
                        parent={this.props.node}
                        parentState={this.props.nodeState}
                        node={child}
                        nodeState={this.getChildState(child)}
                        nodeDepth={this.props.nodeDepth + 1}
                        nodeSiblings={this.layout.children || []}
                        onNodeClick={this.onChildClick.bind(this)}
                    />
                </div>
            )
        })
            : [];
        // } else {
        //     return undefined;
        // }
    }

    getDrawLines() {
        return [
            <div
                key={'top'}
                style={{
                    position: 'absolute',
                    width: window.innerWidth * 3 + 'px',
                    height: '1px',
                    marginTop: '-1px',
                    top: 0,
                    left: 0,
                    marginLeft: -window.innerWidth,
                    pointerEvents: 'none',
                    background: 'rgba(100,100,100,0.05)'
                }}
            >
            </div>,
            <div
                key={'bottom'}
                style={{
                    position: 'absolute',
                    width: window.innerWidth * 3 + 'px',
                    height: '1px',
                    marginBottom : '-1px',
                    left: 0,
                    bottom: 0,
                    marginLeft: -window.innerWidth,
                    pointerEvents: 'none',
                    background: 'rgba(100,100,100,0.05)'
                }}
            >
            </div>,
            <div
                key={'left'}
                style={{
                    position: 'absolute',
                    width: '1px',
                    marginLeft: '-1px',
                    height: window.innerHeight * 3,
                    left: 0,
                    top: 0,
                    marginTop: -window.innerHeight,
                    pointerEvents: 'none',
                    background: 'rgba(100,100,100,0.05)'
                }}
            >
            </div>
        ]
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

    getClassName() {
        const className = ['layout'];
        if (this.props.nodeState.hidden) className.push('hidden');
        if (this.props.nodeState.selected) className.push('selected');
        return className.join(' ');
    }

    render() {
        return (
            <div
                className={this.getClassName()}
                ref={el => this.container = el}
                style={this.getStyle()}
                onClick={() => {
                    if (this.props.onNodeClick) {
                        this.props.onNodeClick(this.props.node);
                    }
                }}
            >
                {this.getHeader()}
                {this.getOverlay()}
                <div
                    className='layout-children'
                    style={this.getChildrenStyle()}
                >
                    {this.getChildren()}
                </div>
                {this.getDrawLines()}
            </div>
        )
    }
}