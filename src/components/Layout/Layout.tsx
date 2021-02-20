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
import { isLayoutMobile, isLayoutTablet } from './../../utils/layout';
import { isNodeLeaf } from './../../utils/node';
import { ontouch } from './../../utils/touch';
import { send } from './../../utils/analytics';
import { LayoutShadow } from '../LayoutShadow/LayoutShadow';

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
    onNodeSelectionChange? : (selectedNode : Node | null) => void;
}
export interface LayoutState {
    selectedChildId: string | null;
    transitionDuration: number;
    transitioning: boolean;
}
export class Layout extends React.Component<LayoutProps> {

    container: HTMLElement | null = null;
    
    layout: Node = treemap(this.props.node.data, this.props.width, this.props.height);

    state: LayoutState = {
        selectedChildId: null,
        transitionDuration: 500,
        transitioning: false
    }

    layers = (this.layout.children || []).map(child => Math.ceil(Math.random() * (this.layout.children?.length || 1)) + 2);

    componentWillMount() {
        this.update(this.props);
    }

    componentDidMount() {
        if (this.container) {
            ontouch(this.container, this.onNodeTouch.bind(this))
        }
    }

    shouldComponentUpdate(nxtProps: LayoutProps, nxtState: LayoutState) { 
        if (this.props.width !== nxtProps.width) return true;
        if (this.props.nodeState.selected !== nxtProps.nodeState.selected) return true;
        // if (this.props.nodeSiblingSelectedId !== nxtProps.nodeSiblingSelectedId &&
        //     (this.props.nodeSiblingSelectedId === null || nxtProps.nodeSiblingSelectedId === null)) return true;
        // if (this.state.selectedChildId !== nxtState.selectedChildId) return true;
        if (this.state.transitioning !== nxtState.transitioning) return true;
        return false;
    }

    componentWillUpdate(nxtProps: LayoutProps) {
        this.update(nxtProps);
    }

    componentDidUpdate() {
        if (this.props.nodeState.selected && this.areNoChildrenSelected() && this.container) {
            this.container.focus();
        }
    }

    update(nxtProps: LayoutProps) {
        if ((nxtProps.width !== this.props.width) || (nxtProps.height !== this.props.height)) {
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

    getSelectedChild(): Node | null {
        if (this.areNoChildrenSelected() || !this.layout.children) return null;
        return this.layout.children.find(child => child.data.id === this.state.selectedChildId) || null;
    }

    setSelectedChild(child: Node) {

        if (this.props.onNodeSelectionChange) {
            this.props.onNodeSelectionChange(child);
        }

        if (this.isChildSelected(child)) return;
        
        send(child.data.label);
        
        this.setState({ selectedChildId: child.data.id, transitioning: true })
        setTimeout(() => {
            this.setState({ transitioning: false })
        }, this.state.transitionDuration);
    }

    clearSelectedChildren() {

        if (this.props.onNodeSelectionChange) {
            this.props.onNodeSelectionChange(this.props.node);
        }

        if (this.areNoChildrenSelected()) return;

        send(this.props.node.data.label);

        this.setState({ selectedChildId: null, transitioning: true });
        setTimeout(() => {
            this.setState({ transitioning: false })
        }, this.state.transitionDuration);
    }

    onChildClick(child: Node | null) {
        if (!child || (isDataNode(child) && this.isChildSelected(child))) {
            this.clearSelectedChildren()
        } else {
            this.setSelectedChild(child);
        }
    }

    getChildTransform(child: Node) {

        let childLeftPerc = child.x0;
        let childTopPerc = child.y0;
        let childWidthPerc = child.x1 - child.x0;
        let childHeightPerc = child.y1 - child.y0;

        let parentWidthPerc = 1 / childWidthPerc;
        let parentWidthPercM = 100 * parentWidthPerc;

        let parentHeightPerc = 1 / childHeightPerc;
        let parentHeightPercM = 100 * parentHeightPerc;

        let childLeftTranslate = childLeftPerc * parentWidthPercM;
        let childTopTranslate = childTopPerc * parentHeightPercM;

        let childYScale = child.y1 - child.y0;
        let childXScale = child.x1 - child.x0;

        const translate = 'translate(' + childLeftTranslate + '%, ' + childTopTranslate + '%)';
        const scale = 'scale(' + childXScale + ', ' + childYScale + ')';

        const transform = scale + " " + translate;
        return transform;
    }

    getChildStyle(child: Node, childIndex : number): React.CSSProperties {
        return {
            top: (100 * child.y0) + "%",
            left: (100 * child.x0) + "%",
            height: (100 * (child.y1 - child.y0)) + "%",
            width: (100 * (child.x1 - child.x0)) + "%",
            // zIndex: child.data.label === 'computation' ? 1  : undefined
            zIndex: isTextNode(child) ? 100 : this.layers[childIndex]
            // width: '100%',
            // height: '100%',
            // transform: this.getChildTransform(child)
        }
    }

    getChildClassName(child: Node): string {
        const className = ['layout-child-position'];
        if (this.isChildSelected(child)) className.push('selected');
        else if (!this.areNoChildrenSelected() && !isTextNode(this.getSelectedChild() as Node)) className.push('hidden');
        return className.join(' ');
    }

    getChildren() {
        if (this.layout.children) {
            return <div
                key={this.props.node.data.id + '-children'}
                className='layout-children'
            >
                {
                    (this.layout.children).map((child, i) => {
                        return (
                            <div
                                key={child.data.id}
                                className={this.getChildClassName(child)}
                                style={this.getChildStyle(child, i)}
                            >
                                <LayoutShadow />
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
                                    onNodeSelectionChange={this.props.onNodeSelectionChange}
                                />
                            </div>
                        )
                    })
                }
            </div>
        }
        return undefined;
    }

    getOverlay() {
        if (isDirectoryNode(this.props.node) || isTextNode(this.props.node)) {
            return (
                <div className='layout-overlay-position'>
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
        return <LayoutDrawLines key={this.props.node.data.id + '-lines'} />
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

    getHeader() {
        if (isDirectoryNode(this.props.node)) {
            return <LayoutHeader
                key={this.props.node.data.id + '-header'}
                {...this.props}
                onNodeClick={this.onHeaderNodeClick.bind(this)}
            />
        }
        return undefined;
    }

    getButtonsStyle(): React.CSSProperties {
        return {
            display: isLayoutTablet(this.props)
                && this.props.nodeState.selected
                && this.areNoChildrenSelected() ? undefined : 'none'
        }
    }

    getLeftButtonStyle(): React.CSSProperties {
        return {
            visibility: this.props.parentState !== null ? undefined : 'hidden'
        }
    }

    getRightButtonStyle(): React.CSSProperties {
        return {
            visibility: this.props.nodeSiblings.length > 0 ? undefined : 'hidden'
        }
    }

    getButtons() {
        return (
            <div className='layout-buttons' style={this.getButtonsStyle()}>
                <div className='layout-btn' style={this.getLeftButtonStyle()}>{'<<'}</div>
                <div className='layout-btn' style={this.getRightButtonStyle()}>{'>'}</div>
            </div>
        )
    }

    onNodeClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (this.props.onNodeClick) {
            this.props.onNodeClick(this.props.node);
        }
        e.stopPropagation();
    }

    onNodeTouch(evt: React.MouseEvent<HTMLDivElement, MouseEvent>, dir: string, phase: string, swipetype: string, distance: number) {

        if (this.state.transitioning) {
            evt.stopPropagation();
            return;
        }

        // evt: contains original Event object
        // dir: contains "none", "left", "right", "top", or "down"
        // phase: contains "start", "move", or "end"
        // swipetype: contains "none", "left", "right", "top", or "down"
        // distance: distance traveled either horizontally or vertically, depending on dir value

        // if (phase === 'end' && (dir == 'right' || dir == 'down')) 

        // if (phase === 'end' && dir == 'left') {
        //     if (this.props.nodeState.selected && !this.areNoChildrenSelected()) {
        //         this.nextSelectedChild();
        //         evt.stopPropagation();
        //     }
        // } else
        // if (phase === 'end' && dir == 'right') {
        //     if (this.props.nodeState.selected && !this.areNoChildrenSelected()) {
        //         this.clearSelectedChildren();
        //         evt.stopPropagation();
        //     }
        // }
    }

    onKeyUp(evt: React.KeyboardEvent) {

        if (this.state.transitioning) {
            evt.stopPropagation();
            return;
        }

        if (evt.keyCode === 39) {
            if (this.props.nodeState.selected && !this.areNoChildrenSelected()) {
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
        if (isTextNode(this.props.node)) className.push('content');
        if (isNodeLeaf(this.props.node)) className.push('leaf');
        if (isNodeBranch(this.props.node)) className.push('branch');
        // if (this.props.nodeSiblingSelectedId !== null && this.props.nodeSiblingSelectedId !== this.props.node.data.id) className.push('sibling');
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