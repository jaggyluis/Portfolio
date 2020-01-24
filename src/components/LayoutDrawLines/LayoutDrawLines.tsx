import * as React from 'react';
import './LayoutDrawLines.css';
import { LayoutProps } from '../Layout/Layout';

export class LayoutDrawLines extends React.Component<LayoutProps> {

    shouldComponentUpdate(nxtProps : LayoutProps) {
        return this.props.nodeState.selected != nxtProps.nodeState.selected;
    }

    getClassName() : string {
        const className = ['layout-draw-lines'];
        if (this.props.nodeState.selected)  className.push('hidden');
        return className.join(' ');
    }

    render() {
        return (
            <div className={this.getClassName()}>
                <div className='line horizontal top' key={'top'}></div>
                <div className='line horizontal bottom' key={'bottom'}></div>
                <div className='line vertical top' key={'left'}>
                </div>
            </div>
        )
    }


}