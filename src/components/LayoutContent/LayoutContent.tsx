import * as React from 'react';
import { LayoutProps } from '../Layout/Layout';

export class LayoutContent extends React.Component<LayoutProps> {
    

    getImage() {
        return this.props.node.data.src || '';
    }

    getChildStyle() : React.CSSProperties {
        return {

        }
    }

    getChildren() {
        return this.props.node.data.content ? this.props.node.data.content.map((txt, index) => {
            return (
                <div 
                    className='layout-text'
                    style={this.getChildStyle()}
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
            fontWeight : 'bold'
            // borderBottom : '1px solid white',
            // color : 'white',
            // backgroundColor : 'darkgrey'
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

        return {
            width: 'calc(100% - ' + (2*padding) + 'px)',
            height: 'calc(100% - ' + (2*padding) + 'px)',
            margin : padding + 'px' ,
            position: 'absolute',
            border : '0.1px solid grey',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: 'url("' + this.getImage() + '")',
            // filter: 'grayscale(50%)',
            backgroundRepeat: 'no-repeat',
            overflowY : 'auto',
            overflowX : 'hidden',
        }
    }
    
    render() {
        return (
            <div   
                className='layout-content'
                style={this.getStyle()}
            >   
                {this.getLabel()}
                {this.getChildren()}
            </div>
        )
    }
}