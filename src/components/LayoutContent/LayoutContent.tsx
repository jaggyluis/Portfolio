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
            borderTop: '1px solid rgba(100,100,100,0.1)',
            color : 'dimgrey',
            // maxWidth : '500px',
            marginTop: '10px'
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
            color : '#d3d3d366',
            mixBlendMode : 'multiply',
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
        return {
            width: this.props.node.data.content ? 'calc(100% - 10px)' : '100%',
            height: '100%',
            position: 'absolute',
            overflowY : 'auto',
            overflowX : 'hidden',
            zIndex : 4,
            marginLeft: this.props.node.data.content ? '10px' : '',
            borderLeft: this.props.node.data.content ? '1px solid rgba(100,100,100,0.1)' : '',
            fontSize : window.innerWidth < 600 ? '12px' : '14px'
            // background : 'white',
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