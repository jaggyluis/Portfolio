import * as React from 'react';
import { NodeData, NodeState } from '../../model/NodeData';
import { LayoutOverlay } from '../LayoutOverlay/LayoutOverlay';
import { Node } from './../../model/Node';
import { treemap } from './../../utils/treemap';
import { LayoutContent } from '../LayoutContent/LayoutContent';

export interface LayoutProps {
    node: Node;
    nodeState: NodeState;
    parent: Node | null;
    parentState: NodeState | null;
}
export class Layout extends React.Component<LayoutProps> {

    container: HTMLElement | null = null;
    layout: Node = treemap({ label: '_', type: 'dir' }, 100, 100);

    state = {
        selectedChild: null,
        transitionDuration: 500
    }

    componentWillMount() {
        this.update();
    }

    componentWillUpdate() {
        this.update();
    }

    update() {

        const nodeData = Object.assign({}, this.props.node.data);
        nodeData.children = !nodeData.children ? undefined : nodeData.children.filter(child => this.props.parentState?.selected || !child.content)

        this.layout = treemap(nodeData, window.innerWidth, window.innerHeight);
        // this.layout = treemap(this.props.node.data, window.innerWidth, window.innerHeight);
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
            zIndex: 1,
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
            zIndex: -1
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

    getChildDisplay(child: Node) {
        if (this.isChildSelected(child) || this.areNoChildrenSelected()) return 'visible';
        return 'none';
    }

    getChildIndex(child: Node) { // NOTE - this can probably be a property of the child ---
        return this.layout.children?.indexOf(child);
    }

    getChildState(child: Node): NodeState {
        return {
            selected: this.isChildSelected(child)
        }
    }

    isChildSelected(child: Node) {
        return this.getChildIndex(child) === this.state.selectedChild;
    }

    setChildSelected(child: Node) {
        this.setState({ selectedChild: this.getChildIndex(child) })
    }

    areNoChildrenSelected() {
        return this.state.selectedChild === null;
    }

    onChildClick(child: Node) {
        this.setChildSelected(child);
    }

    render() {
        const children = this.layout.children ? this.layout.children.map((child, index) => {
            return (
                <div
                    key={index}
                    className='layout-child'
                    onClick={() => { this.onChildClick(child); }}
                    style={this.getChildStyle(child)}
                >
                    <Layout
                        node={child}
                        nodeState={this.getChildState(child)}
                        parent={this.props.node}
                        parentState={this.props.nodeState}
                    />
                </div>
            )
        })
            : [];

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
                {children}
            </div>
        )
    }
}