import * as React from 'react';
import { Node } from './../../model/Node';
import './LayoutImage.css';
import { getImageNodeSrc } from '../../utils/node';

export interface LayoutImageProps {
    node: Node;
    width: number;
}
interface LayoutImageState {
    loaded : boolean;
}
export class LayoutImage extends React.Component<LayoutImageProps> {

    state:LayoutImageState = { loaded: false };

    componentDidMount() {

        const img = new Image();
        img.src = this.getPath();
        img.srcset = this.getSrcSet();

        img.onload = this.handleImageLoaded.bind(this);
    }

    handleImageLoaded() {
        this.setState({ loaded: true });
    }

    handleImageErrored() {
        // TODO ---
    }

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

    getSizes() {
        return "30vw";
    }

    getSrcSet(): string {

        if (!this.state.loaded) { return ''; }

        const path = this.getPath();
        const srcSets = [
            this.getIconPath(path) + " 300w",
            this.getMobilePath(path) + " 600w",
            path + " 1200w"
        ]
        const srcSet = srcSets.join(',');
        return srcSet;
    }

    shouldComponentUpdate(nxtProps: LayoutImageProps, nxtState :LayoutImageState ) {
        return nxtState.loaded !== this.state.loaded;
    }

    render() {
        return (
            <React.Fragment>
                <img
                    className='layout-image'
                    // src={this.getPlaceholderPath(this.getPath())}
                    sizes={this.getSizes()}
                    srcSet={this.getSrcSet()}
                    alt={this.props.node.data.label}
                    // onLoad={this.handleImageLoaded.bind(this)}
                    // onError={this.handleImageErrored.bind(this)}
                />
                <img
                    style={{ display: this.state.loaded ? "none" : undefined }}
                    className='layout-image'
                    src={this.getPlaceholderPath(this.getPath())}
                    alt={this.props.node.data.label}
                />
            </React.Fragment>

        )
    }
}