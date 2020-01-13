import * as React from 'react';
import { LayoutProps } from '../Layout/Layout';

export class LayoutContent extends React.Component<LayoutProps> {
    

    getImage() {
        return this.props.node.data.src || '';
    }

    getChildStyle() : React.CSSProperties {
        return {
            padding : '10px',
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
            padding : '10px',
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

        const padding = 1;

        return {
            width: 'calc(100% - ' + (2*padding) + 'px)',
            height: 'calc(100% - ' + (2*padding) + 'px)',
            margin : padding + 'px' ,
            position: 'absolute',
            // border : '1px solid white',
            // margin : '-1px',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: 'url("' + this.getImage() + '")',
            backgroundRepeat: 'no-repeat',
            overflowY : 'auto',
            overflowX : 'hidden',
            color : 'white',
            backgroundColor : '#2e2e2e',
            boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.2)'
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