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
        const c = Math.ceil(s / 7)
        const d = this.props.nodeDepth * c
        const h = t ? 60 : s - d;
        const r = 220 + Math.random() * 20;

        const color = 'rgb(' + r + ',' + r + ',' + r + ')';
        const gradient = 'repeating-linear-gradient(-45deg, lightgrey, lightgrey 1px, white 1px, white 3px)'

        return {
            fontSize: h + 'px',
            fontWeight: t ? 'bold' : undefined,
            paddingLeft: t ? 0 : undefined,
            lineHeight : t ? 0.7 : undefined,
            background : t ? gradient : undefined,
            mixBlendMode : t ? 'normal' : undefined,
            color : t ? 'white' : undefined
        }
    }

    getColor() {
        return <div className='layout-color' ></div>
    }

    getLabel() {
        let label = getNodeLabel(this.props.node);
        label = label.replace(/_/g, ' ');

        return <div className='layout-label' style={this.getLabelStyle()} >{label}</div>
    }

    render() {
        return (
            <div className='layout-overlay'>
                {this.getImage()}
                {this.getColor()}
                {this.getLabel()}
            </div>
        )
    }
}