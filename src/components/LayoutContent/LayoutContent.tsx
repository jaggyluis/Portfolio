import * as React from 'react';
import { LayoutProps } from '../Layout/Layout';
import { LayoutImage } from '../LayoutImage/LayoutImage';
import { getNodeLabel, getTextNodeContent, isImageNode, isTextNode } from './../../utils/node';
import './LayoutContent.css';


export class LayoutContent extends React.Component<LayoutProps> {

    shouldComponentUpdate() {
        return false;
    }

    getImage() {
        if (isImageNode(this.props.node)) {
            return <LayoutImage 
                node={this.props.node}
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
            if (txt.includes('::')) {
                let split = txt.split('::');
                let items: string[] = [];
                if (split.length > 1) {
                    items = split[1].split('|').filter(s => s.length);
                }
                return <div className='layout-text bullet' key={index} >
                    <div className='layout-title'>{split[0]}</div>
                    <div className='layout-items'>
                        {
                            items.length > 1 
                            ? items.map((s,i) => <li key={i}>{s}</li>)
                            : items.map((s,i) => <div key={i}>{s}</div>)   
                        }
                    </div>
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