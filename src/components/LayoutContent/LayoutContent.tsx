import * as React from 'react';
import { LayoutProps } from '../Layout/Layout';
import { LayoutImage } from '../LayoutImage/LayoutImage';
import { getNodeLabel, getTextNodeContent, isImageNode, isTextNode } from './../../utils/node';
import './LayoutContent.css';


export class LayoutContent extends React.PureComponent<LayoutProps> {

    getImage() {
        if (isImageNode(this.props.node)) {
            return <LayoutImage 
                node={this.props.node}
                contain={this.props.nodeState.selected}
                width={this.props.width}
                />
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

    getButton() {
        if (this.props.nodeState.selected) {
            return <div className='layout-btn' onClick={this.onButtonClick.bind(this)}>x</div>
        }
        return undefined;
    }

    onButtonClick(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (this.props.onNodeClick) {
            this.props.onNodeClick(null);
            e.stopPropagation();
        }
    }

    getClassName() {
        const className = ['layout-content'];
        if (isTextNode(this.props.node))  className.push('text-node');
        return className.join(' ');
    }

    render() {
        return (
            <div className={this.getClassName()}>   
                {this.getImage()}
                {this.getLabel()}
                {this.getText()}
                {this.getButton()}
            </div>
        )
    }
}