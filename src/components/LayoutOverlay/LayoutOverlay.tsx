import * as React from 'react';
import { LayoutImage } from '../LayoutImage/LayoutImage';
import { LayoutProps } from '../Layout/Layout';
import './LayoutOverlay.css';
import { isImageNode, getImageNodeSrc, isTextNode } from '../../utils/node';
import { isLayoutMobile } from './../../utils/layout';
import { getNodeLabel } from './../../utils/node';

export class LayoutOverlay extends React.Component<LayoutProps> {

    getImage() {
        if (isImageNode(this.props.node)) {
            return <LayoutImage src={getImageNodeSrc(this.props.node)} contain={this.props.nodeState.selected}/>
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
        // if (true) {
            return <div className='layout-label' style={this.getLabelStyle()} >{getNodeLabel(this.props.node)}</div>
        // }
        // return undefined;
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