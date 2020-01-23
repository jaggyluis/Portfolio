import * as React from 'react';
import { getImageNodeSrc, isImageNode } from '../../utils/node';
import { LayoutProps } from '../Layout/Layout';
import { LayoutImage } from '../LayoutImage/LayoutImage';
import { isLayoutMobile } from './../../utils/layout';
import { getNodeLabel } from './../../utils/node';
import './LayoutOverlay.css';

export class LayoutOverlay extends React.PureComponent<LayoutProps> {

    getImage() {
        if (isImageNode(this.props.node)) {
            return <LayoutImage 
                src={getImageNodeSrc(this.props.node)} 
                contain={this.props.nodeState.selected}
                width={this.props.width}
                />
        }
        return undefined;
    }

    getLabelStyle(): React.CSSProperties {

        const s = isLayoutMobile(this.props) ? 25 : 30;
        const c = Math.ceil(s / 5)
        const d = this.props.nodeDepth * c
        const h = s - d;

        return {
            fontSize: h + 'px',
        }
    }

    getLabel() {
        return <div className='layout-label' style={this.getLabelStyle()} >{getNodeLabel(this.props.node)}</div>
    }

    render() {
        return (
            <div className='layout-overlay' >
                {this.getImage()}
                <div className='layout-color'></div>
                <div className='layout-lslider'>
                    <div className='layout-slider-color'></div>
                    <div className='layout-tslider'>
                        <div className='layout-slider-color'></div>
                        {this.getLabel()}
                    </div>
                </div>

            </div>
        )
    }
}