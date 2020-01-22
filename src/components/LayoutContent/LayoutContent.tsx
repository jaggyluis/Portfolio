import * as React from 'react';
import { color } from 'd3';
import { LayoutImage } from '../LayoutImage/LayoutImage';
import { LayoutProps } from '../Layout/Layout';
import './LayoutContent.css';
import { isTextNode, getTextNodeContent, isImageNode, getImageNodeSrc, getNodeLabel } from './../../utils/node';

export class LayoutContent extends React.Component<LayoutProps> {
    
    getClassName() {
        const className = ['layout-content'];
        if (isTextNode(this.props.node))  className.push('text-node');
        return className.join(' ');
    }

    getImage() {
        if (isImageNode(this.props.node)) {
            return <LayoutImage src={getImageNodeSrc(this.props.node)} contain={this.props.nodeState.selected}/>
        }
        return undefined;
    }

    getLabel() {
        if (isTextNode(this.props.node)) {
            return <div className='layout-label' >{getNodeLabel(this.props.node)}</div>
        }
        return undefined;
    }

    getText() {
        if (isTextNode(this.props.node)) return getTextNodeContent(this.props.node).map((txt, index) => {
            return <div className='layout-text' key={index} >{txt}</div>
        });
        return undefined;
    }

    render() {
        return (
            <div className={this.getClassName()}>   
                {this.getImage()}
                {this.getLabel()}
                {this.getText()}
            </div>
        )
    }
}