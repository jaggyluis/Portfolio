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

            const split = txt.split('::');

            if (split.length > 1) {
                return <div className='layout-text bullet' key={index} >
                    <div className='layout-title'>{split[0]}</div>
                    {split.slice(1).map((s,i) => <div key={i}>{s}</div>)}
                </div>
            } else {
                return <div className='layout-text' key={index} >{txt}</div>
            }

            
        });
        return undefined;
    }

    getClassName() {
        const className = ['layout-content'];
        return className.join(' ');
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