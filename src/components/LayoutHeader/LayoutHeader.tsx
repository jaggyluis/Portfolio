import * as React from 'react';
import { LayoutProps } from '../Layout/Layout';
import { LayoutHeaderLabel } from '../LayoutHeaderLabel/LayoutHeaderLabel';
import { isLayoutMobile } from './../../utils/layout';
import './LayoutHeader.css';

export interface LayoutHeaderProps extends LayoutProps {
    expanded?: boolean;
    onButtonClick?: () => void;
}
export interface LayoutHeaderState {
    transitionDuration: number;
}
export class LayoutHeader extends React.Component<LayoutHeaderProps> {


    shouldComponentUpdate(nxtProps: LayoutHeaderProps) { // NOTE - or pureComponent
        if (this.props.expanded !== nxtProps.expanded) return true;
        if (this.props.width !== nxtProps.width) return true;
        if (this.props.nodeState.selected !== nxtProps.nodeState.selected) return true;
        if (this.props.nodeSiblingSelectedId !== nxtProps.nodeSiblingSelectedId) return true;
        return false;
    }

    getSiblingNodes() {
        return (
            this.props.nodeSiblings.map(sibling => {
                if (sibling.data.id !== this.props.node.data.id) {
                    return (
                        <LayoutHeaderLabel
                            key={sibling.data.id + '-header-label'}
                            node={sibling}
                            depth={this.props.nodeDepth}
                            selected={false}
                            small={isLayoutMobile(this.props)}
                            onNodeClick={this.props.onNodeClick}
                        />
                    )
                } else {
                    return undefined
                }
            })
        )
    }

    getPrimaryNode() {
        return (
            <LayoutHeaderLabel
                key={this.props.node.data.id + '-header-label'}
                node={this.props.node}
                depth={this.props.nodeDepth}
                selected={true}
                small={isLayoutMobile(this.props)}
                onNodeClick={this.props.onNodeClick}
            />
        )
    }

    onButtonClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (this.props.onButtonClick) {
            this.props.onButtonClick();
            e.stopPropagation();
        }
    }

    getButton() {
        if (this.props.nodeSiblings.length) {
            return <div
                key={this.props.node.data.id + '-btn'}
                className='layout-btn'
                onClick={this.onButtonClick.bind(this)}
                >
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
        if (isLayoutMobile(this.props)) className.push('small');
        return className.join(' ');
    }

    render() {
        return (
            <div className={this.getClassName()} style={this.getStyle()} >
                {this.getPrimaryNode()}
                {this.getSiblingNodes()}
                {this.getButton()}
            </div>
        )
    }
}