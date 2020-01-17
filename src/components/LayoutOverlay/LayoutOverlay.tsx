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
        // setTimeout(() => {
            this.setState({ hidden: true });
        // }, this.state.transitionDuration * 3);   
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
            opacity : this.state.hovered ? 0 : 1,
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
            borderLeft : '1px solid rgba(100,100,100,0.1)',
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
            borderTop : '1px solid rgba(100,100,100,0.1)',
            width: '100%',
            marginLeft : '-25%',
            paddingLeft : '25%',
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

        const s = window.innerWidth < 600 ? 30 : 40;
        const c = Math.ceil(s / 5)
        const d = this.props.nodeDepth * c
        const h = s - d;

        return {
            position: 'relative',
            fontWeight: 'bolder',
            fontSize: h + 'px',
            lineHeight: 0.8,
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
            zIndex: 2,
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
                <LayoutImage src={this.getSplashImagePath()} />
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