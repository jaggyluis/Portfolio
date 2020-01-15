import * as React from 'react';
import { LayoutProps } from '../Layout/Layout';

export class LayoutContent extends React.Component<LayoutProps> {
    
    getImage() {
        return this.props.node.data.src || '';
    }

    getChildStyle() : React.CSSProperties {
        return {
            margin: "32px 30% 0 0",
            borderBottom : '2px solid black',
            paddingBottom : '10px',
            textAlign: 'right',
            paddingRight: '10px'
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
            fontWeight : 'bold',
            fontSize : '40px',
            marginLeft: '-2px',
            lineHeight: '31px',
            position: 'fixed',
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
        const v = Math.floor(Math.random() * 30) + 225;

        return {
            width: 'calc(100% - ' + (2*padding) + 'px)',
            height: 'calc(100% - ' + (2*padding) + 'px)',
            background: this.props.node.data.src ? '' : 'rgba(' + v + ',' + v + ',' + v + ',' + 0.3 + ')',
            margin : padding + 'px' ,
            position: 'absolute',
            backgroundSize:  this.props.nodeState.selected ? 'contain' :'cover',
            backgroundPosition: 'center',
            backgroundImage: 'url("' + this.getImage() + '")',
            // filter: this.props.parentState?.selected ? '' : 'contrast(0.3)',
            // opacity: this.props.parentState?.selected ? 1 : 0.8,
            backgroundRepeat: 'no-repeat',
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
                {this.getLabel()}
                {this.getChildren()}
            </div>
        )
    }
}