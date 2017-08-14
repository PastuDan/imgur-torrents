import React, { Component } from 'react';

export default class Post extends Component {

    state = {
        blobUrls: {}
    };

    postWidth = 728;
    filesArePrioritized = false;

    componentDidMount() {
        this.prioritizeFiles();
    }

    componentDidUpdate(prevProps) {
        const torrentNowAvailable = !prevProps.torrent && this.props.torrent;
        const newPost = prevProps.postMeta.id !== this.props.postMeta.id;
        if (torrentNowAvailable || newPost) {
            this.prioritizeFiles();
        }
    }

    prioritizeFiles() {
        // prioritize the download of the images in this post
        if (!this.props.torrent) {
            console.log(`torrent object not loaded`)
            return;
        }
        //
        // if (this.filesArePrioritized) {
        //     return;
        // }

        this.getImages().forEach(image => {
            console.log(`prioritizing ${image.id}`)
            const file = this.props.torrent.files.find(file => file.name.split('.')[0] === image.id)
            file.getBlobURL((err, url) => {
                console.log(`done downloading ${image.id}`)
                const blobUrls = this.state.blobUrls;
                blobUrls[image.id] = url;
                this.setState({ blobUrls })
            })
        })

        this.filesArePrioritized = true;
    }

    getImages() {
        return this.props.postMeta.images || [{
                id: this.props.postMeta.id,
                height: this.props.postMeta.height,
                width: this.props.postMeta.width,
                link: this.props.postMeta.link,
                title: this.props.postMeta.title
            }];
    }

    imageMarkup(image, height, width) {
        const blobUrl = this.state.blobUrls[image.id];

        if (!blobUrl) {
            return <div className="image-loading">loading...</div>
        }

        if (image.animated) {
            return <video src={blobUrl} autoPlay muted loop/>
        } else {
            return <img src={blobUrl} alt={image.title}/>
        }
    }

    render() {
        const images = this.getImages().map(image => {
            const width = Math.min(image.width, this.postWidth);
            const ratio = image.width / width;
            const height = Math.min(image.height, image.height / ratio);

            return <div key={image.id} className="image">
                <div className="crop" style={{ height }}>
                    {this.imageMarkup(image, height, width)}
                </div>
                {image.description ? <div className="description">{image.description}</div> :
                    <div className="spacer"/>}
            </div>;
        });

        return (
            <div className="content">
                <h1 className="title">{this.props.postMeta.title}</h1>
                {images}
                <div className="actionbar"/>
            </div>
        );
    }
}