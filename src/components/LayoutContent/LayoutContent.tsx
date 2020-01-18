import * as React from 'react';
import { color } from 'd3';
import { LayoutImage } from '../LayoutImage/LayoutImage';
import { LayoutProps } from '../Layout/Layout';

export class LayoutContent extends React.Component<LayoutProps> {
    
    getImagePath() : string {
        return this.props.node.data.src || '';
    }

    getImage() {
        return (
            <LayoutImage 
                src={this.getImagePath()} 
                contain={this.props.nodeState.selected}
            />
        )
    }

    getContentStyle() : React.CSSProperties {
        return {
            borderBottom : '1px solid rgba(100,100,100,0.1)',
            color : 'dimgrey',
            maxWidth : '500px',
        }
    }

    getContent() {
        return this.props.node.data.content ? this.props.node.data.content.map((txt, index) => {
            return (
                <div 
                    className='layout-text'
                    style={this.getContentStyle()}
                    key={index}
                    >
                    {txt}
                </div>
            )
        }) : [];
    }

    getLabelStyle() : React.CSSProperties {
        return {
            textTransform: 'uppercase',
            fontWeight : 'bold',
            fontSize : '40px',
            lineHeight: 0.8,
            position: 'sticky',
            top : 0,
            color : 'lightgrey',
            mixBlendMode : 'multiply'
        }
    }

    getLabel() {
        return this.props.node.data.content ? (
            <div
                className='layout-label'
                style={this.getLabelStyle()}
            >{this.props.node.data.label}
            </div>
        ) : undefined;
    }

    getStyle() : React.CSSProperties {

        const padding = 0;
        const v = Math.floor(Math.random() * 50) + 200;

        return {
            width: 'calc(100% - ' + (2*padding) + 'px)',
            height: 'calc(100% - ' + (2*padding) + 'px)',
            background: this.props.node.data.content ? '' : 'rgba(' + v + ',' + v + ',' + v + ',' + 0.2 + ')',
            margin : padding + 'px' ,
            position: 'absolute',
            overflowY : 'auto',
            overflowX : 'hidden',
            zIndex : 1
        }
    }
    
    render() {
        return (
            <div   
                className='layout-content'
                style={this.getStyle()}
            >   
                {this.getImage()}
                {this.getLabel()}
                {this.getContent()}
            </div>
        )
    }
}