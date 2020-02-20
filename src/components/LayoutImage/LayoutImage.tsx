import * as React from 'react';
import { Node } from './../../model/Node';
import './LayoutImage.css';
import { getImageNodeSrc } from '../../utils/node';

export interface LayoutImageProps {
    node: Node;
    width: number;
}
export class LayoutImage extends React.Component<LayoutImageProps> {

    getMobilePath(path: string): string {
        if (path) {
            const paths = path.split(".");
            const placeholder = paths[0] + "_m." + paths[1];
            return placeholder;
        } else {
            return '';
        }
    }

    getIconPath(path: string): string {
        if (path) {
            const paths = path.split(".");
            const placeholder = paths[0] + "_i." + paths[1];
            return placeholder;
        } else {
            return '';
        }
    }

    getPlaceholderPath(path: string): string {
        if (path) {
            const paths = path.split(".");
            const placeholder = paths[0] + "_s." + paths[1];
            return placeholder;
        } else {
            return '';
        }
    }

    getPath() {
        let src = getImageNodeSrc(this.props.node);
        return src;
    }

    getSrcSet(): string {
        const path = this.getPath();
        const srcSets = [
            this.getIconPath(path) + " 300w",
            this.getMobilePath(path) + " 600w",
            path + " 1200w"
        ]
        const srcSet = srcSets.join(',');
        return srcSet;
    }

    shouldComponentUpdate(nxtProps: LayoutImageProps) {
        return false;
    }

    render() {
        return (
            <img
                className='layout-image'
                src={this.getPlaceholderPath(this.getPath())}
                sizes="50vw"
                srcSet={this.getSrcSet()}
                alt={this.getPath()}
            />
        )
    }
}