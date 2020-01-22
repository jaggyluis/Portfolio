import * as React from 'react';
import { LayoutImage } from '../LayoutImage/LayoutImage';
import { LayoutProps } from '../Layout/Layout';
import './LayoutOverlay.css';

export class LayoutOverlay extends React.Component<LayoutProps> {

    getSplashImagePath(): string {
        return this.props.node.data.src || '';
    }

    getLabelStyle(): React.CSSProperties {

        const s = this.props.width < 600 ? 25 : 30;
        const c = Math.ceil(s / 5)
        const d = this.props.nodeDepth * c
        const h = s - d;

        return {
            fontSize: h + 'px',
        }
    }

    render() {
        return (
            <div className='layout-overlay' >
                <LayoutImage src={this.getSplashImagePath()} />
                <div className='layout-color'></div>
                <div className='layout-lslider'>
                    <div className='layout-slider-color'></div>
                    <div className='layout-tslider'>
                        <div className='layout-slider-color'></div>
                        <div className='layout-label'style={this.getLabelStyle()}>{this.props.node.data.label}</div>
                    </div>
                </div>

            </div>
        )
    }
}