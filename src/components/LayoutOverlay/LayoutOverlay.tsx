import * as React from 'react';
import { LayoutProps } from '../Layout/Layout';

export class LayoutOverlay extends React.Component<LayoutProps> {

    state = {
        hovered: false,
        hidden: false,
        selected: false,
        transitionDuration: 300
    }

    onMouseEnter(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        this.setState({ hovered: true });
        event.stopPropagation();
    }

    onMouseLeave(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        this.setState({ hovered: false });
        event.stopPropagation();
    }

    onClick() {
        this.setState({ hidden: true });
    }

    getStyle(): React.CSSProperties {

        const padding = 0;
        const v = Math.floor(Math.random() * 30) + 225;

        return {
            width: 'calc(100% - ' + (2*padding) + 'px)',
            height: 'calc(100% - ' + (2*padding) + 'px)',
            // background: 'rgba(' + v + ',' + v + ',' + v + ',' + 1 + ')',
            margin : padding + 'px' ,
            position: 'absolute',
            // filter: 'saturate(0.5)',
            opacity: this.state.hovered ? 0 : 1,
            display: this.state.hidden ? 'none' : '',
            transition: 2 * this.getTransitionDuration() + 'ms'
        }
    }

    getSplashImage() : string {
        return this.props.node.data.src || '';
    }

    getSplashStyle(): React.CSSProperties {
        return {
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: 'url("' + this.getSplashImage() + '")',
            backgroundRepeat: 'no-repeat',
            opacity: this.state.hovered ? 0 : 1,
            transition: 2 * this.getTransitionDuration() + 'ms'
        }
    }

    getColorStyle(): React.CSSProperties {
        return {
            width: '100%',
            height: '100%',
            position: 'absolute',
            transition: 2 * this.getTransitionDuration() + 'ms'
        }
    }

    getLSliderStyle(): React.CSSProperties {
        return {
            position: 'absolute',
            bottom: 0,
            right: 0,
            height: '100%',
            background: 'rgba(255,255,255,0.5)',
            width: !this.state.hovered ? '80%' : '100%',
            transition: this.getTransitionDuration() + 'ms'
        }
    }

    getTSliderStyle(): React.CSSProperties {
        return {
            position: 'absolute',
            bottom: 0,
            left: 0,
            background: 'rgba(255,255,255,0.5)',
            height: !this.state.hovered ? '70%' : '100%',
            width: '100%',
            transition: this.getTransitionDuration() + 'ms',
            transitionDelay : this.getTransitionDuration() + 'ms'
        }
    }

    getLabelStyle(): React.CSSProperties {
        return {
            position: 'absolute',
            fontWeight: 'bolder',
            fontSize: '40px',
            lineHeight: '32px',
            textTransform: 'uppercase',
            marginLeft: '-2px',
            left: 0,
            top: 0,
            opacity: this.props.parentState == null || this.props.parentState.selected ? 1 : 0,
            transition: this.getTransitionDuration() + 'ms'
        }
    }

    getTransitionDuration() {
        return this.state.transitionDuration;
    }

    render() {
        return (
            <div
                className='layout-overlay'
                onClick={this.onClick.bind(this)}
                onMouseEnter={this.onMouseEnter.bind(this)}
                onMouseLeave={this.onMouseLeave.bind(this)}
                style={this.getStyle()}
            >
                <div className='layout-splash' style={this.getSplashStyle()}></div>
                <div className='layout-color' style={this.getColorStyle()}></div>
                <div className='layout-lslider' style={this.getLSliderStyle()}>
                    <div className='layout-tslider' style={this.getTSliderStyle()}>
                        <div
                            className='layout-label'
                            style={this.getLabelStyle()}>{this.props.node.data.label}</div>
                    </div>
                </div>
                
            </div>
        )
    }
}