import React, { Component } from 'react'

export class Newsitem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props
        return (
            <div className='container my-3'>
                <div className="card">
                    <div style={{ display: "flex", justifyContent: "flex-end", position: "absolute", right: "0" }}>

                        <span className="badge rounded-pill bg-danger">
                            {source}
                        </span>
                    </div>
                        <img src={imageUrl ? imageUrl : "https://cdn1.techbang.com/system/excerpt_images/128646/original/f1cf303eab690d577bee08d44bb7d0f5.jpg?1775031483"} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{title}...</h5>
                            <h5 className="card-text">{description}...</h5>
                            <p className="card-text"><small className="text-body-secondary">By {!author ? "unknown" : author} on {new Date(date).toGMTString()}</small></p>
                            <a href={newsUrl} target='_blank' className="btn btn-sm btn-primary">Read More</a>
                        </div>
                </div>
            </div>
        )
    }
}

export default Newsitem