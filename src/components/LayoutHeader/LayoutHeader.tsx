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
export interface LayoutHeaderState {
    visibleHeaderNodes: boolean;
    transitionDuration: number;
}
export class LayoutHeader extends React.Component<LayoutProps> {

    container: HTMLElement | null = null;
    layout: Node = treemap(this.props.node.data, this.props.width, this.props.height);

    state: LayoutHeaderState = {
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
            paddingTop: isLayoutMobile(this.props) && isSibling ? diff + 'px' : '',
            color: isSibling ? 'lightgrey' : 'black',
            background: 'repeating-linear-gradient(-45deg,transparent,transparent 1px,rgba(100,100,100,0.1) 1px, rgba(100,100,100,0.1) 2px)',
            display: this.props.nodeState.selected ? '' : 'none'
        }
    }

    getHeaderNodeContent(node: Node): string {
        let content = node.data.label;
        if (!isLayoutMobile(this.props) && this.props.nodeState.selected) {
            content = "/ " + node.data.label;
        }
        return content;
    }

    onButtonClick() {
        this.setState({ visibleHeaderNodes: !this.state.visibleHeaderNodes })
    }

    getButtonStyle(): React.CSSProperties {
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
                    className='layout-header-btn'
                    onClick={this.onButtonClick.bind(this)}
                    style={this.getButtonStyle()}>
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
                                        this.state.visibleHeaderNodes = false;
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

    getPrimaryNode() {
        return (
            <div
                className='layout-header-node'
                // onClick={this.clearSelectedChildren.bind(this)}
                onClick={(e) => {
                    if (this.props.onNodeClick) {
                        this.props.onNodeClick(this.props.node);
                        e.stopPropagation();
                        this.state.visibleHeaderNodes = false;
                    }
                }}
                style={this.getHeaderNodeStyle()}>{this.props.node.data.label}
            </div>
        )
    }

    getClassName() {
        const className = ['layout'];
        if (this.props.nodeState.hidden) className.push('hidden');
        if (this.props.nodeState.selected) className.push('selected');
        return className.join(' ');
    }

    render() {
        return (
            <div className='layout-header'
                style={this.getHeaderStyle()}
            >
                {this.getPrimaryNode()}
                {this.getSiblingNodes()}
                {this.getButton()}
            </div>
        )
    }
}