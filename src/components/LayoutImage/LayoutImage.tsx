import * as React from 'react';
import { Node } from './../../model/Node';
import './LayoutImage.css';
import { getImageNodeSrc } from '../../utils/node';

export interface LayoutImageProps {
    node: Node;
    contain: boolean;
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
        return nxtProps.contain !== this.props.contain;
    }

    getClassName() {
        const className = ['layout-image'];
        if (this.props.contain) className.push('contain');
        return className.join(' ');
    }

    render() {
        return (
            <img
                className={this.getClassName()}
                src={this.getPlaceholderPath(this.getPath())}
                sizes={/*this.props.contain ? "100vw" : */ "50vw" }
                srcSet={this.getSrcSet()}
                alt={this.getPath()}
            />
        )
    }
}