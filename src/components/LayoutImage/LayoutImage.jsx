import * as React from 'react'

export class LayoutImage extends React.Component {

    state = { src: null, placeholder: null, contain: !!this.props.contain };

    getPlaceholderPath(path) {
        if (path) {
            const paths = path.split(".");
            const placeholder = paths[0] + "_s." + paths[1];
            return placeholder;
        } else {
            return '';
        }
    }

    getMobilePath(path) {
        if (path) {
            const paths = path.split(".");
            const placeholder = paths[0] + "_m." + paths[1];
            return placeholder;
        } else {
            return '';
        }
    }

    componentDidMount() {
        let { src } = this.props;

        if (window.innerWidth < 600) src = this.getMobilePath(src);
        // src = this.getPlaceholderPath(src);

        const srcImageLoader = new Image();
        srcImageLoader.src = src;
        srcImageLoader.onload = () => {
            this.setState({ src });
        };
    }

    shouldComponentUpdate(nextProps) {
        return this.state.src === null || (this.state.contain !== !!nextProps.contain);
    }

    getStyle() {
        return {
            width: '100%',
            height: '100%',
            objectFit: this.props.contain ? 'contain' : 'cover',
            position: 'absolute',
            filter :  this.props.contain ? 'drop-shadow(0px 0px 1px rgba(0,0,0,.3))' : ''
        }
    }

    render() {

        this.state.contain = !!this.props.contain;

        return (
            <img
                src={this.state.src || this.getPlaceholderPath(this.props.src)}
                alt=''
                style={this.getStyle()}
            />
        )
    }
}