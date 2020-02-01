import * as React from 'react';
import { Node } from './../../model/Node';
import { getNodeLabel } from './../../utils/node';
import { isLayoutMobile } from './../../utils/layout';


export interface LayoutHeaderLabelProps {
    node: Node;
    depth: number;
    selected?: boolean;
    small?: boolean;
    onNodeClick?: (node: Node | null) => void;
}

export class LayoutHeaderLabel extends React.Component<LayoutHeaderLabelProps> {

    shouldComponentUpdate(nxtProps : LayoutHeaderLabelProps) {
        if (this.props.selected !== nxtProps.selected) return true;
        if (this.props.small !== nxtProps.small) return true;
        return false;
    }

    getLabel(): string {
        let label = getNodeLabel(this.props.node)
        if (!this.props.small && !this.props.selected) label = "/ " + label;
        return label;
    }

    onNodeClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (this.props.onNodeClick) {
            this.props.onNodeClick(this.props.node);
            e.stopPropagation();
        }
    }

    getStyle(): React.CSSProperties {

        const s = this.props.small ? 26 : 30;
        const c = Math.ceil(s / 5)
        const d = this.props.depth * c
        const h = s - d;

        return {
            fontSize: h + 'px',
        }
    }

    getClassName(): string {
        const className = ['layout-header-node'];
        if (!this.props.selected) className.push('sibling');
        return className.join(' ');
    }

    render() {
        return (
            <div
                className={this.getClassName()}
                onClick={this.onNodeClick.bind(this)}
                key={this.props.node.data.id + "-sibling"}
                style={this.getStyle()}>
                {this.getLabel()}
            </div>
        );
    }
}