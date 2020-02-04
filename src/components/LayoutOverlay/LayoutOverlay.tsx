import * as React from 'react';
import { isImageNode, isDataNode, isTextNode } from '../../utils/node';
import { LayoutProps } from '../Layout/Layout';
import { LayoutImage } from '../LayoutImage/LayoutImage';
import { isLayoutMobile } from './../../utils/layout';
import { getNodeLabel } from './../../utils/node';
import './LayoutOverlay.css';

export class LayoutOverlay extends React.Component<LayoutProps> {

    shouldComponentUpdate(nxtProps: LayoutProps) {
        if (this.props.width !== nxtProps.width) return true;
        if (this.props.nodeState.selected !== nxtProps.nodeState.selected) return true;
        return false;
    }

    getImage() {
        if (isImageNode(this.props.node)) {
            return <LayoutImage
                key={this.props.node.data.id + '-overlay-image'}
                node={this.props.node}
                contain={this.props.nodeState.selected}
                width={this.props.width}
            />
        }
        return undefined;
    }

    getLabelStyle(): React.CSSProperties {

        const t = isTextNode(this.props.node)
        const s = isLayoutMobile(this.props) ? 26 : 30;
        const c = Math.ceil(s / 5)
        const d = this.props.nodeDepth * c
        const h = t ? 60 : s - d;

        return {
            fontSize: h + 'px',
            fontWeight: t ? 'bold' : undefined,
            paddingLeft: t ? 0 : undefined,
            lineHeight : t ? 0.7 : undefined
        }
    }

    getLabel() {
        return <div className='layout-label' style={this.getLabelStyle()} >{getNodeLabel(this.props.node)}</div>
    }

    getStyle() : React.CSSProperties {

        const r = Math.random() * 75;

        return {
            background : 'rgb(' + r + ',' + r + ',' + r + ')'
        }
    }

    render() {
        return (
            <div className='layout-overlay' style={this.getStyle()}>
                {this.getImage()}
                {this.getLabel()}
            </div>
        )
    }
}