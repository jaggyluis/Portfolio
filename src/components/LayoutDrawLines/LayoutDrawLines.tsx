import * as React from 'react';
import { LayoutProps } from '../LayoutHeader/LayoutHeader';
import './LayoutDrawLines.css';

export const LayoutDrawLines:React.FC<LayoutProps> = (props) => {

    const height= props.height* 3;
    const width = props.width* 3;

    return (
        <div
            className='layout-draw-lines'
        >
            <div
                className='line horizontal top'
                key={'top'}
                style={{
                    width: width,
                    marginLeft: -width,
                }}
            >
            </div>
            <div
                className='line horizontal bottom'
                key={'bottom'}
                style={{
                    width: width,
                    marginLeft: -width,
                }}
            >
            </div>
            <div
                className='line vertical top'
                key={'left'}
                style={{
                    height: height,
                    marginTop: -height,
                }}
            >
            </div>
        </div>
    )
}