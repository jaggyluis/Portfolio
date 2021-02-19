import * as React from 'react';
import { Node } from '../../model/Node';
import './LayoutShadow.css';
import { getImageNodeSrc, isNodeLeaf } from '../../utils/node';

export const LayoutShadow: React.FC<any> = (props: any) => {

    return (
        <>
            <div
                className='layout-shadow'
            />
        </>
    )
}