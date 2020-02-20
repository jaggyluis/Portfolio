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
        return false;
    }

    getImage() {
        if (isImageNode(this.props.node)) {
            return <LayoutImage
                key={this.props.node.data.id + '-overlay-image'}
                node={this.props.node}
                width={this.props.width}
            />
        }
        return undefined;
    }

    getLabelStyle(): React.CSSProperties {

        const t = isTextNode(this.props.node)
        const s = isLayoutMobile(this.props) ? 22 : 26;
        const c = Math.ceil(s / 7)
        const d = this.props.nodeDepth * c
        const h = t ? 60 : s - d;
        const r = 180 + Math.random() * 40;

        // http://stripesgenerator.com/
        // http://www.patternify.com/

        const color =  'lightgrey';
        const gradient = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAALElEQVQYV2NkwAIuX778nxFdHCSoq6vLiCIBEwQphksgC8Il0AXBEtgEQRIAvF8Xf8iAtVMAAAAASUVORK5CYII=";
        const background = 'url(' + gradient +') repeat'

        return {
            fontSize: h + 'px',
            fontWeight: t ? 'bold' : undefined,
            paddingLeft: t ? 0 : undefined,
            lineHeight : t ? 0.7 : undefined,
            background : t ? background : undefined,
            mixBlendMode : t ? 'normal' : undefined,
            color : t ? 'white' : undefined,
            borderBottom: t ? '1px solid ' + color : undefined,
            borderRight: t ? '1px solid ' + color : undefined,
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