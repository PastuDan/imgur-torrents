import React, {Component} from 'react';

export default class Post extends Component {

    postWidth = 728;

    render() {
        let images = this.props.images || [{
                id: this.props.id,
                height: this.props.height,
                width: this.props.width,
                link: this.props.link,
                title: this.props.title
            }];

        images = images.map(image => {
            const width = Math.min(image.width, this.postWidth);
            const ratio = image.width / width;
            const height = Math.min(image.height, image.height / ratio);

            return <div key={image.id} className="image">
                <div className="crop">
                    <img src={image.memoryURL} alt={image.title} width={width} height={height} />
                </div>
                {image.description ? <div className="description">{image.description}</div> : <div className="spacer"></div>}
            </div>;
        });

        return (
            <div className="content">
                <h1 className="title">{this.props.title}</h1>
                {images}
                <div className="actionbar"></div>
            </div>
        );
    }
}