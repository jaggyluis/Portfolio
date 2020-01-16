import * as React from 'react';
import { LayoutProps } from '../Layout/Layout';
import { LayoutImage } from '../LayoutImage/LayoutImage';

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

    getSplashImagePlaceholderPath(): string {
        if (this.props.node.data.src) {
            const paths = this.props.node.data.src.split(".");
            const path = paths[0] + "_s." + paths[1];
            return path;
        } else {
            return '';
        }
    }

    getSplashImagePath(): string {
        return this.props.node.data.src || '';
    }

    getSplashStyle(): React.CSSProperties {

        const v = Math.floor(Math.random() * 30) + 225;

        return {
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: 'url("' + this.getSplashImagePath() + '")',
            backgroundRepeat: 'no-repeat',
            // opacity: this.state.hovered ? 0 : 1,
            // filter:  'blur(5px)', //'grayscale(50%)',
            transition: 2 * this.getTransitionDuration() + 'ms',
            willChange: 'opacity'
        }
    }

    getColorStyle(): React.CSSProperties {
        return {
            width: '100%',
            height: '100%',
            position: 'absolute',
            background: 'rgba(255,255,255,0.2)',
            opacity: this.state.hovered ? 0 : 1,
            transition: 2 * this.getTransitionDuration() + 'ms',
            willChange: 'opacity'
        }
    }

    getLSliderStyle(): React.CSSProperties {
        return {
            position: 'absolute',
            bottom: 0,
            right: 0,
            height: '100%',
            // display: this.props.parentState == null || this.props.parentState.selected ? '' : 'none',
            width: !this.state.hovered ? '80%' : '100%',
            transition: this.getTransitionDuration() + 'ms',
            willChange: 'width'
        }
    }

    getTSliderStyle(): React.CSSProperties {
        return {
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: !this.state.hovered ? '70%' : '100%',
            width: '100%',
            transition: this.getTransitionDuration() + 'ms',
            transitionDelay: this.getTransitionDuration() + 'ms',
            willChange: 'height'
        }
    }

    getSliderColorStyle(): React.CSSProperties {
        return {
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'rgba(255,255,255,0.5)',
            opacity: this.state.hovered ? 0 : 1,
            transition: this.getTransitionDuration() + 'ms',
            transitionDelay: this.getTransitionDuration() + 'ms',
            willChange: 'opacity'
        }
    }

    getLabelStyle(): React.CSSProperties {

        const d = this.props.nodeDepth * 10
        const h = 40 - d;

        return {
            position: 'relative',
            fontWeight: 'bolder',
            fontSize: h + 'px',
            textTransform: 'uppercase',
            mixBlendMode: 'overlay',
            left: 0,
            top: 0,
        }
    }

    getStyle(): React.CSSProperties {

        const padding = 0;
        const v = Math.floor(Math.random() * 30) + 225;

        return {
            width: 'calc(100% - ' + (2 * padding) + 'px)',
            height: 'calc(100% - ' + (2 * padding) + 'px)',
            // background: 'rgba(' + v + ',' + v + ',' + v + ',' + 1 + ')',
            margin: padding + 'px',
            overflow: 'hidden',
            position: 'absolute',
            display: this.state.hidden ? 'none' : '',
            opacity: this.props.parentState == null || this.props.parentState.selected ? 1 : 0,
            transition: 2 * this.getTransitionDuration() + 'ms'
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
                <LayoutImage src={this.getSplashImagePath()} placeholder={this.getSplashImagePlaceholderPath()}/>
                {/* <div className='layout-splash' style={this.getSplashStyle()}></div> */}
                <div className='layout-color' style={this.getColorStyle()}></div>
                <div className='layout-lslider' style={this.getLSliderStyle()}>
                    <div style={this.getSliderColorStyle()}></div>
                    <div className='layout-tslider' style={this.getTSliderStyle()}>
                        <div style={this.getSliderColorStyle()}></div>
                        <div
                            className='layout-label'
                            style={this.getLabelStyle()}>{this.props.node.data.label}</div>
                    </div>
                </div>

            </div>
        )
    }
}