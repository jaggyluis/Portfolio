import * as React from 'react'

export class LayoutImage extends React.Component {
    state = { src: null, placeholder : null };

    componentDidMount() {
        const { src, placeholder } = this.props;

        const srcImageLoader = new Image();
        srcImageLoader.src = src;
        srcImageLoader.onload = () => {
            this.setState({ src });
        };

        const placeholderImageLoader = new Image();
        placeholderImageLoader.src = placeholder;
        placeholderImageLoader.onload = () => {
            this.setState({ placeholder });
        };
    }

    getStyle() {
        return { 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            position: 'absolute',
            filter: this.state.placeholder && !this.state.src ? 'blur(5px)' : ''
        }
    }

    render() {
        // console.log(this.state.src, this.state.placeholder)
        return <img src={this.state.src || this.props.placeholder} alt='' style={this.getStyle()}/>;

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