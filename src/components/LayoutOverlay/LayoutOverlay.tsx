import * as React from 'react';
import { LayoutImage } from '../LayoutImage/LayoutImage';
import { LayoutProps } from '../Layout/Layout';

export class LayoutOverlay extends React.Component<LayoutProps> {

    state = {
        hovered: false,
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

    getSplashImagePath(): string {
        return this.props.node.data.src || '';
    }

    getSplashStyle(): React.CSSProperties {
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
            width : '100%',
            borderLeft : '1px solid rgba(100,100,100,0.1)',
            transform : !this.state.hovered ? 'translate(20%, 0)' : '',
            WebkitTransform: !this.state.hovered ? 'translate(20%, 0)' : '',
            transition: this.getTransitionDuration() + 'ms',
            willChange: 'transform'
        }
    }

    getTSliderStyle(): React.CSSProperties {
        return {
            position: 'absolute',
            bottom: 0,
            left: 0,
            height : '100%',
            width: '100%',
            marginLeft : '-25%',
            paddingLeft : '25%',
            borderTop : '1px solid rgba(100,100,100,0.1)',
            transform : !this.state.hovered ? 'translate(0, 30%)' : '',
            WebkitTransform : !this.state.hovered ? 'translate(0, 30%)' : '',
            transition: this.getTransitionDuration() + 'ms',
            transitionDelay: this.getTransitionDuration() + 'ms',
            willChange : 'transform'
        }
    }

    getSliderColorStyle(): React.CSSProperties {
        return {
            position: 'absolute',
            width: '100%',
            height: '100%',
            // background: 'rgba(255,255,255,0.5)',
            background: 'repeating-linear-gradient(-45deg,transparent,transparent 1px,rgba(100,100,100,0.1) 1px, rgba(100,100,100,0.1) 2px)',
            opacity: this.state.hovered ? 0 : 1,
            transition: this.getTransitionDuration() + 'ms',
            transitionDelay: this.getTransitionDuration() + 'ms',
            willChange: 'opacity'
        }
    }

    getLabelStyle(): React.CSSProperties {

        const s = this.props.width < 600 ? 30 : 40;
        const c = Math.ceil(s / 5)
        const d = this.props.nodeDepth * c
        const h = s - d;

        return {
            position: 'relative',
            fontWeight: 'bolder',
            fontSize: h + 'px',
            lineHeight: 0.8,
            textTransform: 'uppercase',
            borderBottom : '1px solid rgba(100,100,100,0.1)',
            // mixBlendMode: 'overlay',
            wordBreak: 'break-all',
            background: 'repeating-linear-gradient(45deg,transparent,transparent 1px,rgba(100,100,100,0.2) 1px, rgba(100,100,100,0.2) 2px)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'white',
            left: 0,
            top: 0,
        }
    }

    getStyle(): React.CSSProperties {

        return {
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            position: 'absolute',
            zIndex: 2,
            display: this.props.nodeState.selected ? 'none' : '',
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