import * as React from 'react'
import './LayoutImage.css';

export interface LayoutImageProps {
    src : string;
    contain : boolean;
    width : number;
}
export interface LayoutImageState {
    src : string | null;
    placeholder : string | null;
    contain : boolean;
}
export class LayoutImage extends React.Component<LayoutImageProps> {

    state = { src: null, placeholder: null, contain: !!this.props.contain };

    getPlaceholderPath(path:string) : string {
        if (path) {
            const paths = path.split(".");
            const placeholder = paths[0] + "_s." + paths[1];
            return placeholder;
        } else {
            return '';
        }
    }

    getMobilePath(path:string) : string {
        if (path) {
            const paths = path.split(".");
            const placeholder = paths[0] + "_m." + paths[1];
            return placeholder;
        } else {
            return '';
        }
    }

    componentDidMount() {
        let src = this.props.src;

        if (this.props.width < 600) src = this.getMobilePath(src);
        // src = this.getPlaceholderPath(src);
        
        const srcImageLoader = new Image();
        srcImageLoader.src = src;
        srcImageLoader.onload = () => {
            this.setState({ src });
        };
    }

    shouldComponentUpdate(nextProps : LayoutImageProps) {
        return this.state.src === null || (this.state.contain !== !!nextProps.contain);
    }

    getClassName() {
        const className = ['layout-image'];
        if (this.props.contain) className.push('contain');
        return className.join(' ');
    }

    render() {

        this.state.contain = !!this.props.contain;

        return (
            <img
                className={this.getClassName()}
                src={this.state.src || this.getPlaceholderPath(this.props.src)}
                alt='layout-image'
            />
        )
    }
}