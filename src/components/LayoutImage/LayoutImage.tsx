import * as React from 'react';
import { Node } from './../../model/Node';
import './LayoutImage.css';
import { getImageNodeSrc, isNodeLeaf } from '../../utils/node';

export interface LayoutImageProps {
    node: Node;
    width: number;
}

export const LayoutImage: React.FC<LayoutImageProps> = (props: LayoutImageProps) => {

    const { node, width} = props;

    const src = React.useMemo(() => { return getImageNodeSrc(props.node) }, [props.node])

    const path = React.useMemo(() => {

        const ext = width <= 300 ? '_i' : width <= 600  || !isNodeLeaf(node)  ? '_m' : '';

        if (src) {
            const paths = src.split(".");
            const placeholder = paths[0] + `${ext}.` + paths[1];
            return placeholder;
        } else {
            return '';
        }
    }, [src, width]);

    const placeholder = React.useMemo(() => {
        if (src) {
            const paths = src.split(".");
            const placeholder = paths[0] + "_s." + paths[1];
            return placeholder;
        } else {
            return '';
        }
    }, [src]);

    return (
        <>
            <div
                className='layout-image placeholder'
                style={{
                    backgroundImage: `url(${placeholder})`
                }}
            />
            <div
                className='layout-image'
                style={{
                    backgroundImage: `url(${path})`
                }}
            />
        </>
    )
}