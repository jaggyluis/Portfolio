import * as React from 'react';
import { Node } from './../../model/Node';
import './LayoutImage.css';
import { getImageNodeSrc } from '../../utils/node';

export interface LayoutImageProps {
    node: Node;
    contain: boolean;
    width: number;
}
export interface LayoutImageState {
    src: string | null;
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

    getNodeWidth() {

        const width = this.props.width;
        const nodeWidth = this.props.node.x1 - this.props.node.x0;
        return width * nodeWidth;
    }

    shouldComponentUpdate(nxtProps: LayoutImageProps) {
        return nxtProps.contain !== this.props.contain || nxtProps.width !== this.props.width;
    }

    // componentDidMount() {
    //     let src = this.props.src;

    //     if (this.props.width < 600) src = this.getMobilePath(src);
    //     // src = this.getPlaceholderPath(src);

    //     const srcImageLoader = new Image();
    //     srcImageLoader.src = src;
    //     srcImageLoader.onload = () => {
    //         this.setState({ src });
    //     };
    // }

    getClassName() {
        const className = ['layout-image'];
        if (this.props.contain) className.push('contain');
        return className.join(' ');
    }

    render() {

        let src = getImageNodeSrc(this.props.node);
        let width = this.props.width;

        if (!this.props.contain) {
            width = this.getNodeWidth();
        }

        if (width < 300) {
            src = this.getIconPath(src);
        } else if (width < 600) {
            src = this.getMobilePath(src);
        }

        return (
            // <img
            //     className={this.getClassName()}
            //     src={this.state.src || this.getPlaceholderPath(this.props.src)}
            //     alt='layout-node'
            // />
            <img
                className={this.getClassName()}
                src={src}
                data-src={this.getNodeWidth()}
                data-width={this.props.width}
                alt='layout-node'
            />
            // <div
            //     className={this.getClassName()}
            //     style={{ backgroundImage:'url(' + src + ')' }}
            // >
            // </div>
        )
    }
}