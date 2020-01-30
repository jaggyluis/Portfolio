import * as React from 'react';
import { isImageNode, isDataNode } from '../../utils/node';
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

        const s = isLayoutMobile(this.props) ? 35 : 30;
        const c = Math.ceil(s / 5)
        const d = this.props.nodeDepth * c
        const h = s - d;

        return {
            fontSize: h + 'px',
        }
    }

    getLabel() {
        if (!isDataNode(this.props.node)) {
            return <div className='layout-label' style={this.getLabelStyle()} >{getNodeLabel(this.props.node)}</div>
        }
        return undefined;
    }

    render() {
        return (
            <div className='layout-overlay' >
                {this.getImage()}
                <div className='layout-color'></div>
                {this.getLabel()}
            </div>
        )
    }
}