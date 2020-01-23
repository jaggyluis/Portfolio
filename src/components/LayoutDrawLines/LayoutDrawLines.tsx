import * as React from 'react';
import './LayoutDrawLines.css';

export class LayoutDrawLines extends React.Component {

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <div className='layout-draw-lines'>
                <div className='line horizontal top' key={'top'}></div>
                <div className='line horizontal bottom' key={'bottom'}></div>
                <div className='line vertical top' key={'left'}>
                </div>
            </div>
        )
    }


}