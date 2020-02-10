import * as React from 'react';
import { Node } from '../../model/Node';
import { NodeState } from '../../model/NodeData';
import { isDataNode, isDirectoryNode, isNodeBranch, isTextNode } from '../../utils/node';
import { treemap } from '../../utils/treemap';
import { LayoutContent } from '../LayoutContent/LayoutContent';
import { LayoutDrawLines } from '../LayoutDrawLines/LayoutDrawLines';
import { LayoutHeader } from '../LayoutHeader/LayoutHeader';
import { LayoutOverlay } from '../LayoutOverlay/LayoutOverlay';
import './Layout.css';
import { isLayoutMobile } from './../../utils/layout';
import { isNodeLeaf } from './../../utils/node';
import { ontouch } from './../../utils/touch';

const EMPTY_NODE_ARRAY: Node[] = [];

export interface LayoutProps {
    width: number,
    height: number,
    node: Node;
    nodeState: NodeState;
    nodeDepth: number;
    nodeSiblings: Node[];
    nodeSiblingSelectedId: string | null;
    parent: Node | null;
    parentState: NodeState | null;
    onNodeClick?: (node: Node | null) => void;
}
export interface LayoutState {
    selectedChildId: string | null;
    headerExpanded: boolean;
    transitionDuration: number;
    transitioning: boolean;
}
export class Layout extends React.Component<LayoutProps> {

    container: HTMLElement | null = null;
    layout: Node = treemap(this.props.node.data, this.props.width, this.props.height);

    state: LayoutState = {
        selectedChildId: null,
        headerExpanded: false,
        transitionDuration: 400,
        transitioning: false
    }

    componentDidMount() {
        if (this.container) {
            ontouch(this.container, this.onNodeTouch.bind(this))
        }
    }

    componentWillMount() {
        this.update(this.props);
    }

    componentWillUpdate(nxtProps: LayoutProps) {
        this.update(nxtProps);
    }

    shouldComponentUpdate(nxtProps: LayoutProps, nxtState: LayoutState) { // NOTE - or pureComponent
        if (this.props.width !== nxtProps.width) return true;
        if (this.props.nodeState.selected !== nxtProps.nodeState.selected) return true;
        if (this.props.nodeSiblingSelectedId !== nxtProps.nodeSiblingSelectedId) return true;
        if (this.state.selectedChildId !== nxtState.selectedChildId) return true;
        if (this.state.transitioning !== nxtState.transitioning) return true;
        if (this.state.headerExpanded !== nxtState.headerExpanded) return true;
        return false;
    }

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

    nextSelectedChild() {
        if (this.areNoChildrenSelected() || !this.layout.children) {
            return;
        } else {
            let index: number | null = null;
            let child = this.layout.children.find((child, i) => {
                if (this.isChildSelected(child)) {
                    index = i;
                    return true;
                }
                return false;
            });

            if (index !== null) {

                index = index === this.layout.children.length - 1 ? 0 : ++index;
                child = this.layout.children[index];

                if (child) {
                    // this.clearSelectedChildren();
                    // setTimeout(() => {
                        this.setSelectedChild(child as Node);
                    // }, this.state.transitionDuration + 100)
                }
            }
        }
    }

    getSelectedChild() : Node | null {
        if (this.areNoChildrenSelected() || !this.layout.children) return null;
        return this.layout.children.find(child => child.data.id === this.state.selectedChildId) || null;
    }

    setSelectedChild(child: Node) {
        this.setState({ selectedChildId: child.data.id, transitioning: true })
        setTimeout(() => {
            this.setState({ transitioning: false })
        }, this.state.transitionDuration)
    }

    shouldChildrenSlide() : boolean {
        return !this.areNoChildrenSelected() && (isNodeBranch(this.props.node) || isTextNode(this.getSelectedChild() as Node));
    }

    clearSelectedChildren() {
        this.setState({ selectedChildId: null, transitioning: true });
        setTimeout(() => {
            this.setState({ transitioning: false })
        }, this.state.transitionDuration)
    }

    onChildClick(child: Node | null) {
        if (!child || (isDataNode(child) && this.isChildSelected(child))) {
            this.clearSelectedChildren()
        } else {
            this.setSelectedChild(child);
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
        if (!this.areNoChildrenSelected() && isTextNode(this.getSelectedChild() as Node)) return (100 * (child.x1 - child.x0)) + "%";
        return '0%';
    }

    getChildHeight(child: Node) {
        if (this.isChildSelected(child)) return '100%';
        if (this.areNoChildrenSelected()) return (100 * (child.y1 - child.y0)) + "%";
        if (!this.areNoChildrenSelected() && isTextNode(this.getSelectedChild() as Node)) return (100 * (child.y1 - child.y0)) + "%";
        return '0%';
    }

    getChildZIndex(child: Node) {
        if (this.isChildSelected(child) || this.areNoChildrenSelected()) return 2;
        return 0;
    }

    getChildDisplay(child: Node) {
        if (this.isChildSelected(child) || this.areNoChildrenSelected()) return undefined;
        return 'none'
    }

    getChildTransform(child: Node) {
        if (this.isChildSelected(child)) return 'translate3d(0,0,0)';
        return 'translate3d(0,0,0)';
    }

    getChildStyle(child: Node): React.CSSProperties {
        return {
            position: 'absolute',
            top: this.getChildTop(child),
            left: this.getChildLeft(child),
            height: this.getChildHeight(child),
            width: this.getChildWidth(child),
            zIndex: this.getChildZIndex(child),
            transform: this.getChildTransform(child),
            transition: this.state.transitionDuration + 'ms',
            willChange: 'top, left, height, width, transform',
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
        if (this.layout.children) {
            return <div
                key={this.props.node.data.id + '-children'}
                className='layout-children'
                style={this.getChildrenStyle()}
            >
                {
                    (this.layout.children).map((child) => {
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
                                    nodeSiblings={this.layout.children || EMPTY_NODE_ARRAY}
                                    nodeSiblingSelectedId={this.state.selectedChildId}
                                    onNodeClick={this.onChildClick.bind(this)}
                                />
                            </div>
                        )
                    })
                }
            </div>
        }
        return undefined;
    }

    getOverlayStyle(): React.CSSProperties {
        return {
            position: 'absolute',
            width: '100%',
            height: '100%',
            pointerEvents: this.props.nodeState.selected ? 'none' : undefined,
            display: this.props.nodeState.selected ? 'none' : '',
        }
    }

    getOverlay() {
        if (isDirectoryNode(this.props.node) || isTextNode(this.props.node)) {
            return (
                <div className='layout-overlay-position' style={this.getOverlayStyle()}>
                    <LayoutOverlay key={this.props.node.data.id + '-overlay'} {...this.props} />
                </div>
            )
        }
        return undefined;
    }

    getContent() {
        if (isDataNode(this.props.node)) {
            return <LayoutContent key={this.props.node.data.id + '-content'}  {...this.props} />
        }
        return undefined;
    }

    getDrawLines() {
        return <LayoutDrawLines key={this.props.node.data.id + '-lines'}  {...this.props} />
    }

    onHeaderNodeClick(node: Node | null) {
        if (!node || node.data.id === this.props.node.data.id) {
            this.clearSelectedChildren()
        } else {
            if (this.props.onNodeClick) {
                this.props.onNodeClick(node);
            }
        }
    }

    onHeaderButtonClick() {
        this.setState({ headerExpanded: !this.state.headerExpanded })
    }

    getHeader() {
        if (isDirectoryNode(this.props.node)) {
            return <LayoutHeader
                key={this.props.node.data.id + '-header'}
                {...this.props}
                expanded={this.state.headerExpanded}
                onNodeClick={this.onHeaderNodeClick.bind(this)}
                onButtonClick={this.onHeaderButtonClick.bind(this)}
            />
        }
        return undefined;
    }

    getButtonsStyle(): React.CSSProperties {
        return {
            // opacity : this.props.nodeState.selected && this.areNoChildrenSelected() ? 1 : 0,
            // transition: this.state.transitionDuration + 'ms',
            display : isLayoutMobile(this.props) 
                && this.props.nodeState.selected 
                && this.areNoChildrenSelected() ? undefined : 'none'
        }
    }

    getLeftButtonStyle(): React.CSSProperties {
        return {
            visibility : this.props.parentState !== null ? undefined : 'hidden'
        }
    }

    getRightButtonStyle() : React.CSSProperties {
        return {
            visibility : isNodeLeaf(this.props.node) ? undefined : 'hidden'
        }
    }

    getButtons() {
        return (
            <div className='layout-buttons' style={this.getButtonsStyle()}>
                <div className='layout-btn' style={this.getLeftButtonStyle()}>{'<'}</div>
                <div className='layout-btn' style={this.getRightButtonStyle()}>{'>'}</div>
            </div>
        )
    }

    onNodeClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (this.props.onNodeClick) {
            this.props.onNodeClick(this.props.node);
            e.stopPropagation();
        }
    }

    onNodeTouch(evt: React.MouseEvent<HTMLDivElement, MouseEvent>, dir: string, phase: string, swipetype: string, distance: number) {

        // evt: contains original Event object
        // dir: contains "none", "left", "right", "top", or "down"
        // phase: contains "start", "move", or "end"
        // swipetype: contains "none", "left", "right", "top", or "down"
        // distance: distance traveled either horizontally or vertically, depending on dir value
        
        // if (phase === 'end' && (dir == 'right' || dir == 'down')) 

        if (phase === 'end' && dir == 'left') {
            if (this.props.nodeState.selected && isNodeBranch(this.props.node)) {
                this.nextSelectedChild();
                evt.stopPropagation();
            }
        } else if (phase === 'end' && dir == 'right') {
            if (this.props.nodeState.selected && !this.areNoChildrenSelected()) {
                this.clearSelectedChildren();
                evt.stopPropagation();
            }
        }
    }

    onKeyUp(evt : React.KeyboardEvent) {
        if (evt.keyCode === 39) {
            if (this.props.nodeState.selected && isNodeBranch(this.props.node)) {
                this.nextSelectedChild();
                evt.stopPropagation();
            }
        } else if (evt.keyCode === 37) {
            if (this.props.nodeState.selected && !this.areNoChildrenSelected()) {
                this.clearSelectedChildren();
                evt.stopPropagation();
            }
        }
    }

    getClassName() {
        const className = ['layout'];
        if (this.props.nodeState.selected) className.push('selected');
        if (this.state.transitioning) className.push('transitioning');
        if (isNodeLeaf(this.props.node)) className.push('leaf');
        if (isNodeBranch(this.props.node)) className.push('branch');
        if (this.props.nodeDepth === 0) className.push('root');
        return className.join(' ');
    }

    render() {
        return (
            <div
                className={this.getClassName()}
                ref={el => this.container = el}
                onClick={this.onNodeClick.bind(this)}
                onKeyUp={this.onKeyUp.bind(this)}
                tabIndex={0}
            >
                {this.getHeader()}
                {this.getChildren()}
                {this.getContent()}
                {this.getButtons()}
                {this.getOverlay()}
                {this.getDrawLines()}
            </div>
        )
    }
}