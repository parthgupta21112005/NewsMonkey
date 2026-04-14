import React, { Component } from 'react'
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }
  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9e6a7ac60b8a4bac83c03e6bfd35be55&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false
    })
  }
  async componentDidMount() {
    this.updateNews();
  }
  handlePrevious = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9e6a7ac60b8a4bac83c03e6bfd35be55&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parseData = await data.json();
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parseData.articles,
    //   loading: false})
    this.setState({ page: this.state.page - 1 });
    this.updateNews()
  }
  handleNext = async () => {
    // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / `${this.props.pageSize}`))) {  
    //   this.setState({loading: true});
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9e6a7ac60b8a4bac83c03e6bfd35be55&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //   let data = await fetch(url);
    //   let parseData = await data.json();
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parseData.articles,
    //     loading: false})
    // }
    this.setState({ page: this.state.page + 1 });
    this.updateNews()
  }
  render() {
    return (
      <>
        <div className='container my-3'>
          {this.state.loading && <Spinner />}
          <h1 className='text-center'>NewsMonkey - Top Headlines on {this.capitalizeFirstLetter(this.props.category)}</h1>
          <div className="row">
            {!this.state.loading && this.state.articles.map((elements) => {
              return <div className="col-md-3" key={elements.url}>
                <Newsitem title={elements.title ? elements.title.slice(0, 45) : ""} description={elements.description ? elements.description.slice(0, 88) : "Not Describe"} imageUrl={elements.urlToImage} newsUrl={elements.url} author={elements.author} date={elements.publishedAt} source={elements.source.name} />
              </div>
            })}
          </div>
        </div>
        <div className="container my-3 d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-outline-primary mx-3" onClick={this.handlePrevious}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / `${this.props.pageSize}`)} type="button" className="btn btn-outline-danger" onClick={this.handleNext}>Next &rarr;</button>
        </div>
      </>
    )
  }
}

export default News