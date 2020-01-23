import * as React from 'react';
import { Node } from '../../model/Node';
import { NodeState } from '../../model/NodeData';
import { isDataNode, isDirectoryNode } from '../../utils/node';
import { treemap } from '../../utils/treemap';
import { LayoutContent } from '../LayoutContent/LayoutContent';
import { LayoutDrawLines } from '../LayoutDrawLines/LayoutDrawLines';
import { LayoutHeader } from '../LayoutHeader/LayoutHeader';
import { LayoutOverlay } from '../LayoutOverlay/LayoutOverlay';
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
    onNodeClick?: (node: Node | null) => void;
}
export interface LayoutState {
    selectedChildId: string | null;
    headerExpanded : boolean;
    transitionDuration: number;
    transitioning: boolean;
}
export class Layout extends React.PureComponent<LayoutProps> {

    container: HTMLElement | null = null;
    layout: Node = treemap(this.props.node.data, this.props.width, this.props.height);

    state: LayoutState = {
        selectedChildId: null,
        headerExpanded: false,
        transitionDuration: 400,
        transitioning: false
    }

    componentWillMount() {
        this.update(this.props);
    }

    componentWillUpdate(nxtProps: LayoutProps) {
        this.update(nxtProps);
    }

    // shouldComponentUpdate() { // NOTE - pureComponent
    //     return this.props.parentState == null || this.props.parentState.selected;
    // }

    update(nxtProps: LayoutProps) {
        this.state.headerExpanded = false;
        if (nxtProps.width !== this.props.width || nxtProps.height !== this.props.height) {
            this.layout = treemap(nxtProps.node.data, nxtProps.width, nxtProps.height);
        }
        if (!nxtProps.nodeState.selected) {
            this.state.selectedChildId = null;
        }
    }

    getChildState(child: Node): NodeState {
        return {
            selected: this.isChildSelected(child),
        }
    }

    isChildSelected(child: Node) {
        return this.state.selectedChildId === child.data.id;
    }

    areNoChildrenSelected() {
        return this.state.selectedChildId === null;
    }

    setSelectedChild(child: Node) {
        this.setState({ selectedChildId: child.data.id, transitioning : true})
        setTimeout(() => {
            this.setState({transitioning : false})
        }, this.state.transitionDuration)
    }

    clearSelectedChildren() {
        this.setState({ selectedChildId: null, transitioning : true});
        setTimeout(() => {
            this.setState({transitioning : false})
        }, this.state.transitionDuration)
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

    getChildZIndex(child: Node) {
        if (this.isChildSelected(child) || this.areNoChildrenSelected()) return 2;
        return 0;
    }

    getChildStyle(child: Node): React.CSSProperties {
        return {
            position: 'absolute',
            top: this.getChildTop(child),
            left: this.getChildLeft(child),
            height: this.getChildHeight(child),
            width: this.getChildWidth(child),
            zIndex: this.getChildZIndex(child),
            transition: this.state.transitionDuration + 'ms',
            willChange: 'top, left, height, width'
        }
    }

    getChildrenStyle(): React.CSSProperties {
        return {
            position: 'relative',
            height: this.state.headerExpanded ? '0' : '100%',
            overflow: this.state.headerExpanded ? 'hidden' : 'visible',
            width: '100%',
            display: this.props.nodeState.selected ? '' : 'none',
        }
    }

    getChildren() {
        return <div
            className='layout-children'
            style={this.getChildrenStyle()}
        >
            {
                (this.layout.children || []).map((child) => {
                    return (
                        <div
                            key={child.data.id}
                            className='layout-child-position'
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
            }
        </div>
    }

    getOverlayPositionStyle(): React.CSSProperties {
        return {
            position: 'absolute',
            width: '100%',
            height: '100%',
            pointerEvents: this.props.nodeState.selected ? 'none' : undefined,
            display: this.props.nodeState.selected ? 'none' : '',
        }
    }

    getOverlay() {
        if (isDirectoryNode(this.props.node)) {
            return (
                <div className='layout-overlay-position' style={this.getOverlayPositionStyle()}>
                    <LayoutOverlay {...this.props} />
                </div>
            )
        }
        return undefined;
    }

    getContent() {
        if (isDataNode(this.props.node)) {
            return <LayoutContent {...this.props} />
        }
        return undefined;
    }

    getDrawLines() {
        if (!this.props.nodeState.selected) {
            return <LayoutDrawLines />
        } else {
            return undefined;
        }
    }

    getHeader() {
        if (isDirectoryNode(this.props.node)) {
            return <LayoutHeader
                {...this.props}
                expanded={this.state.headerExpanded}
                onNodeClick={(node) => {
                    if (!node || node.data.id === this.props.node.data.id) {
                        this.clearSelectedChildren()
                    } else {
                        if (this.props.onNodeClick) {
                            this.props.onNodeClick(node);
                        }
                    }
                }}
                onButtonClick={() => {
                    this.setState({headerExpanded : !this.state.headerExpanded})
                }}
            />
        }
        return undefined;
    }

    getClassName() {
        const className = ['layout'];
        if (this.props.nodeState.selected) className.push('selected');
        if (this.state.transitioning) className.push('transitioning');
        return className.join(' ');
    }

    render() {
        return (
            <div
                className={this.getClassName()}
                ref={el => this.container = el}
                onClick={(e) => {
                    if (this.props.onNodeClick) {
                        this.props.onNodeClick(this.props.node);
                        e.stopPropagation();
                    }
                }}
            >
                {this.getHeader()}
                {this.getOverlay()}
                {this.getChildren()}
                {this.getContent()}
                {this.getDrawLines()}
            </div>
        )
    }
}