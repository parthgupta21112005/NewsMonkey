import React, { Component } from 'react'

export class Newsitem extends Component {
    render() {
        let {title,description,imageUrl,newsUrl}=this.props
        return (
            <div className='container my-3'>
                <div className="card">
                    <img src={imageUrl?imageUrl:"https://cdn1.techbang.com/system/excerpt_images/128646/original/f1cf303eab690d577bee08d44bb7d0f5.jpg?1775031483"} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}...</h5>
                            <p className="card-text">{description}...</p>
                            <a href={newsUrl} target='_blank' className="btn btn-sm btn-primary">Read More</a>
                        </div>
                </div>
            </div>
        )
    }
}

export default Newsitem