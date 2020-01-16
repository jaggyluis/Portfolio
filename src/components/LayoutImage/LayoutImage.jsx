import * as React from 'react'

export class LayoutImage extends React.Component {
    state = { src: null, placeholder : null };

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

        const srcImageLoader = new Image();
        srcImageLoader.src = src;
        srcImageLoader.onload = () => {
            this.setState({ src });
        };
    }

    getStyle() {
        return { 
            width: '100%', 
            height: '100%', 
            objectFit:  this.props.contain ? 'contain' : 'cover', 
            position: 'absolute',
        }
    }

    render() {
        // console.log(this.state.src, this.state.placeholder)
        return <img src={this.state.src || this.getPlaceholderPath(this.props.src)} alt='' style={this.getStyle()}/>;

        // const url = this.state.src ? this.state.src : this.state.placeholder ? this.state.placeholder : ''

        // return <div style={{
        //     position: 'absolute',
        //     width: '100%',
        //     height: '100%',
        //     backgroundSize:  'cover',
        //     backgroundPosition: 'center',
        //     backgroundImage: 'url("' + url + '")',
        //     backgroundRepeat: 'no-repeat',
        // }}></div>
    }
}