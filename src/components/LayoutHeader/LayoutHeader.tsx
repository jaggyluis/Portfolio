import * as React from 'react';
import { NodeData, NodeState } from '../../model/NodeData';
import { LayoutOverlay } from '../LayoutOverlay/LayoutOverlay';
import { Node } from '../../model/Node';
import { treemap } from '../../utils/treemap';
import { LayoutContent } from '../LayoutContent/LayoutContent';
import { isLayoutMobile } from './../../utils/layout';
import './LayoutHeader.css';

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
    visibleHeaderNodes : boolean;
    transitionDuration: number;
}
export class LayoutHeader extends React.Component<LayoutProps> {

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

    getHeaderStyle(): React.CSSProperties {

        const s = isLayoutMobile(this.props) ? 25 : 30;
        const c = Math.ceil(s / 5)
        const d = this.props.nodeDepth * c
        const h = s - d;

        let diff = 42 - h;
        let display = this.props.nodeState.selected ? 'flex' : 'none';
        if (isLayoutMobile(this.props) && this.props.nodeState.selected) {
            display = '';
        }

        return {
            display: display,
            flexWrap: 'wrap',
            marginBottom: diff + 'px',
            borderBottom: '1px solid rgba(100,100,100,0.05)'
        }
    }

    getHeaderNodeStyle(isSibling: boolean = false): React.CSSProperties {

        const s = isLayoutMobile(this.props) ? 25 : 30;
        const c = Math.ceil(s / 5)
        const d = this.props.nodeDepth * c
        const h = s - d;

        let diff = 42 - h;

        return {
            position: 'relative',
            fontWeight: isSibling ? 'lighter' : 'bolder',
            paddingRight: '10px',
            fontSize: h + 'px',
            lineHeight: 0.8,
            textTransform: 'uppercase',
            mixBlendMode: 'overlay',
            marginBottom : isLayoutMobile(this.props) ? diff +'px' : '', 
            color: isSibling ? 'lightgrey' : 'black',
            display: this.props.nodeState.selected ? '' : 'none'
        }
    }

    getHeaderNodeContent(node : Node) : string {
        let content = node.data.label;
        if (!isLayoutMobile(this.props) && this.props.nodeState.selected) {
            content = "/ " + node.data.label;
        }
        return content;
    }

    onHeaderDropdownClick() {
        this.setState({visibleHeaderNodes : !this.state.visibleHeaderNodes})
    }

    getHeaderDropdownStyle() : React.CSSProperties {
        return {
            position: 'absolute',
            right: 0,
            top: 0,
            fontSize: '30px',
            height: '36px',
            borderRadius: '36px',
            border: '1px dashed lightgrey',
            width: '36px',
            textAlign: 'center',
            lineHeight: '36px'
        }
    }

    getButton() {
        if (this.props.nodeSiblings.length && isLayoutMobile(this.props)) {
            return (
                <div 
                className='layout-header-dropdown' 
                onClick={this.onHeaderDropdownClick.bind(this)}
                style={this.getHeaderDropdownStyle()}>
                    {
                        this.state.visibleHeaderNodes ? '-' : '+'
                    }
                </div>
            )
        }
        return undefined;
    }

    getSiblingNodes() {
        if (!isLayoutMobile(this.props) || this.state.visibleHeaderNodes) {
            return (
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
                                {this.getHeaderNodeContent(sibling)}
                            </div>
                        )
                    } else {
                        return undefined
                    }
                })
            )
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
        if (this.props.node.data.type !== 'dir') {
            return undefined;
        }
        return (
            <div className='layout-header'
                style={this.getHeaderStyle()}
            >
                <div
                    className='layout-header-node'
                    // onClick={this.clearSelectedChildren.bind(this)}
                    style={this.getHeaderNodeStyle()}>{this.props.node.data.label}
                </div>
                {this.getSiblingNodes()}
                {this.getButton()}
            </div>
        )
    }
}