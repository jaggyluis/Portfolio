import * as React from 'react';
import { LayoutProps } from '../Layout/Layout';
import { color } from 'd3';
import { LayoutImage } from '../LayoutImage/LayoutImage';

export class LayoutContent extends React.Component<LayoutProps> {
    
    getImagePlaceholderPath()  : string {
        if (this.props.node.data.src) {
            const paths = this.props.node.data.src.split(".");
            const path = paths[0] + "_s." + paths[1];
            return path;
        } else {
            return '';
        }
    }

    getImagePath() : string {
        return this.props.node.data.src || '';
    }

    getImageStyle() : React.CSSProperties {
        return {
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundSize:  this.props.nodeState.selected ? 'contain' :'cover',
            backgroundPosition: 'center',
            backgroundImage: 'url("' + this.getImagePath() + '")',
            backgroundRepeat: 'no-repeat',
        }
    }

    getImage() {
        return (
            <LayoutImage src={this.getImagePath()} placeholder={this.getImagePlaceholderPath()}/>
            // <div className='layout-content-image' style={this.getImageStyle()}></div>
        )
    }

    getContentStyle() : React.CSSProperties {
        return {
            // margin: "32px 10% 0 0",
            borderBottom : '1px solid rgba(100,100,100,0.05)',
            // paddingBottom : '10px',
            // textAlign: 'right',
            // paddingRight: '10px',
            color : 'dimgrey',
            maxWidth : '500px'
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
            background: 'rgba(' + v + ',' + v + ',' + v + ',' + 0.2 + ')',
            margin : padding + 'px' ,
            position: 'absolute',
            overflowY : 'auto',
            overflowX : 'hidden'
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