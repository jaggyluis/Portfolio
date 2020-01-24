import * as React from 'react';
import { Node } from '../../model/Node';
import { treemap } from '../../utils/treemap';
import { isLayoutMobile } from './../../utils/layout';
import './LayoutHeader.css';
import { LayoutProps } from '../Layout/Layout';

export interface LayoutHeaderProps extends LayoutProps {
    expanded? : boolean;
    onButtonClick? : () => void;
}
export interface LayoutHeaderState {
    transitionDuration: number;
}
export class LayoutHeader extends React.PureComponent<LayoutHeaderProps> {

    container: HTMLElement | null = null;
    layout: Node = treemap(this.props.node.data, this.props.width, this.props.height);

    state: LayoutHeaderState = {
        transitionDuration: 400
    }

    getNodeStyle(isSibling: boolean = false): React.CSSProperties {

        const s = isLayoutMobile(this.props) ? 25 : 30;
        const c = Math.ceil(s / 5)
        const d = this.props.nodeDepth * c
        const h = s - d;

        let diff = 42 - h;

        return {
            fontSize: h + 'px',
            paddingTop: isLayoutMobile(this.props) && isSibling ? diff + 'px' : '',
        }
    }

    getNodeContent(node: Node): string {
        let content = node.data.label;
        if (!isLayoutMobile(this.props) && this.props.nodeState.selected) {
            content = "/ " + node.data.label;
        }
        return content;
    }

    getSiblingNodes() {
        if (!isLayoutMobile(this.props) || this.props.expanded) {
            return (
                this.props.nodeSiblings.map(sibling => {
                    if (sibling.data.id !== this.props.node.data.id) {
                        return (
                            <div
                                className='layout-header-node sibling'
                                onClick={(e) => {
                                    if (this.props.onNodeClick) {
                                        this.props.onNodeClick(sibling);
                                        e.stopPropagation();
                                    }
                                }}
                                key={sibling.data.id + "-sibling"}
                                style={this.getNodeStyle(true)}>
                                {this.getNodeContent(sibling)}
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
                key={this.props.node.data.id + '-primary'}
                className='layout-header-node'
                onClick={(e) => {
                    if (this.props.onNodeClick) {
                        this.props.onNodeClick(this.props.node);
                        e.stopPropagation();
                    }
                }}
                style={this.getNodeStyle()}>{this.props.node.data.label}
            </div>
        )
    }

    onButtonClick(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (this.props.onButtonClick) {
            this.props.onButtonClick();
        }
        e.stopPropagation();
    }

    getButton() {
        if (this.props.nodeSiblings.length && isLayoutMobile(this.props)) {
            return <div 
                key={this.props.node.data.id + '-btn'} 
                className='layout-btn' 
                onClick={this.onButtonClick.bind(this)}>
                    {this.props.expanded ? '-' : '+'}
                </div>
        }
        return undefined;
    }

    getStyle(): React.CSSProperties {

        const s = isLayoutMobile(this.props) ? 25 : 30;
        const c = Math.ceil(s / 5)
        const d = this.props.nodeDepth * c
        const h = s - d;

        let diff = 42 - h;
        let display = this.props.nodeState.selected ? 'flex' : 'none';
        let margin = diff + 'px';
        
        if (isLayoutMobile(this.props) && this.props.nodeState.selected) {
            display = '';
        }

        return {
            display: display,
            marginBottom: margin
        }
    }

    getClassName() {
        const className = ['layout-header'];
        if (this.props.expanded) className.push('expanded');
        if (this.props.nodeState.selected) className.push('selected');
        return className.join(' ');
    }

    render() {
        return (
            <div className={this.getClassName()}
                style={this.getStyle()}
            >
                {this.getPrimaryNode()}
                {this.getSiblingNodes()}
                {this.getButton()}
            </div>
        )
    }
}