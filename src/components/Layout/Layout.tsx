import * as React from 'react';
import { NodeData, NodeState } from '../../model/NodeData';
import { LayoutOverlay } from '../LayoutOverlay/LayoutOverlay';
import { Node } from '../../model/Node';
import { treemap } from '../../utils/treemap';
import { LayoutContent } from '../LayoutContent/LayoutContent';
import './Layout.css';
import { LayoutHeader } from '../LayoutHeader/LayoutHeader';
import { isDirectoryNode, isDataNode } from '../../utils/node';
import { LayoutDrawLines } from '../LayoutDrawLines/LayoutDrawLines';

export interface LayoutProps {
    width: number,
    height: number,
    node: Node;
    nodeState: NodeState;
    nodeDepth: number;
    nodeSiblings: Node[];
    parent: Node | null;
    parentState: NodeState | null;
    onNodeClick?: (node: Node) => void;
}
export interface LayoutState {
    width: number;
    height: number;
    selectedChildId: string | null;
    visibleChildId: string | null;
    visibleHeaderNodes: boolean;
    transitionDuration: number;
}
export class Layout extends React.Component<LayoutProps> {

    container: HTMLElement | null = null;
    layout: Node = treemap(this.props.node.data, this.props.width, this.props.height);

    state: LayoutState = {
        width: this.props.width,
        height: this.props.height,
        selectedChildId: null,
        visibleChildId: null,
        visibleHeaderNodes: false,
        transitionDuration: 400
    }

    componentWillMount() {
        this.update(this.props);
    }

    componentWillUpdate(nxtProps: LayoutProps) {
        this.update(nxtProps);
    }

    shouldComponentUpdate() {
        return this.props.parentState == null || this.props.parentState.selected;
    }

    isComponentMobile() {
        return this.state.width < 600;
    }

    update(layoutProps: LayoutProps) {
        if (layoutProps.width !== this.state.width || layoutProps.height !== this.state.height) {
            this.layout = treemap(layoutProps.node.data, layoutProps.width, layoutProps.height);
            this.state.width = layoutProps.width;
            this.state.height = layoutProps.height;
        }
        if (!layoutProps.nodeState.selected) {
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

    isChildVisible(child: Node) {
        return this.state.visibleChildId === child.data.id;
    }

    isChildSelected(child: Node) {
        return this.state.selectedChildId === child.data.id;
    }

    areNoChildrenSelected() {
        return this.state.selectedChildId === null;
    }

    setSelectedChild(child: Node) {
        // if (child.data.type === 'dir') {
        //     this.setState({ selectedChildId: child.data.id })
        //     setTimeout(() => {
        //         this.setState({ visibleChildId: child.data.id });
        //     }, this.state.transitionDuration)
        // } else {
            this.setState({ selectedChildId: child.data.id, visibleChildId: child.data.id })
        // }
    }

    clearSelectedChildren() {
        this.setState({ selectedChildId: null, visibleChildId: null });
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
        // return (100 * (child.x1 - child.x0)) + "%";
        if (this.areNoChildrenSelected()) return (100 * (child.x1 - child.x0)) + "%";
        return '0%';
    }

    getChildHeight(child: Node) {
        if (this.isChildSelected(child)) return '100%';
        // return (100 * (child.y1 - child.y0)) + "%"
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
            // opacity: this.getChildOpacity(child),
            // display: this.getChildDisplay(child),
            transition: this.state.transitionDuration + 'ms',
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
        if (!this.props.nodeState.selected) {
            return undefined;
        }
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
            pointerEvents: this.props.nodeState.selected ? 'none' : 'all',
            display: this.props.nodeState.selected ? 'none' : ''
            // opacity: this.props.nodeState.selected ? 0 : 1,
            // transitionDelay: this.state.transitionDuration + 'ms',
            // transition: this.state.transitionDuration + 'ms',
        }
    }

    getOverlay() {
        if (isDirectoryNode(this.props.node)) {
            return (
                <div className='layout-overlay-position'style={this.getOverlayPositionStyle()}>
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
        if (!this.props.parentState || this.props.parentState.selected) {
            return <LayoutDrawLines {...this.props} />
        }
        return undefined;
    }

    getHeader() {
        if (isDirectoryNode(this.props.node)) {
            return <LayoutHeader {...this.props} onNodeClick={(node) => {
                if (node.data.id === this.props.node.data.id) {
                    this.clearSelectedChildren()
                } else {
                    if (this.props.onNodeClick) {
                        this.props.onNodeClick(node);
                    }
                }
            }} />
        }
        return undefined;
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