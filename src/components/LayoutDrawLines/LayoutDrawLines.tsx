import * as React from 'react';
import { LayoutProps } from '../LayoutHeader/LayoutHeader';
import './LayoutDrawLines.css';

export const LayoutDrawLines: React.FC<LayoutProps> = (props) => {

    return (
        <div className='layout-draw-lines'>
            <div className='line horizontal top' key={'top'}></div>
            <div className='line horizontal bottom' key={'bottom'}></div>
            <div className='line vertical top' key={'left'}>
            </div>
        </div>
    )
}