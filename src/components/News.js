import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };

    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsMonkey`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `/api/news?country=${this.props.country}&category=${this.props.category}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true });

    try {
      const data = await fetch(url);

      if (!data.ok) {
        console.error('API error:', data.status);

        this.setState({
          loading: false,
          articles: [],
          totalResults: 0,
        });

        this.props.setProgress(100);
        return;
      }

      this.props.setProgress(30);

      const parseData = await data.json();

      console.log('API Response:', parseData);

      this.props.setProgress(70);

      this.setState({
        articles: parseData.articles || [],
        totalResults: parseData.totalResults || 0,
        loading: false,
      });

      this.props.setProgress(100);
    } catch (error) {
      console.error('Fetch error:', error);

      this.setState({
        loading: false,
        articles: [],
        totalResults: 0,
      });

      this.props.setProgress(100);
    }
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePrevious = async () => {
    this.setState(
      {
        page: this.state.page - 1,
      },
      () => {
        this.updateNews();
      }
    );
  };

  handleNext = async () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.updateNews();
      }
    );
  };

  fetchMoreData = async () => {
    if (this.state.articles.length >= 100) return; // NewsAPI free plan limit

    const nextPage = this.state.page + 1;
    this.setState({ page: nextPage });

    const url = `/api/news?country=${this.props.country}&category=${this.props.category}&page=${nextPage}&pageSize=${this.props.pageSize}`;

    try {
      const data = await fetch(url);
      if (!data.ok) {
        console.error('API error:', data.status);
        return;
      }
      const parseData = await data.json();
      const newArticles = parseData.articles || [];

      if (newArticles.length === 0) return; // koi naya data nahi aaya, ruk jao

      this.setState({
        articles: this.state.articles.concat(newArticles),
        totalResults: parseData.totalResults || 0,
      });
    } catch (error) {
      console.error('Fetch more data error:', error);
    }
  };

  render() {
    return (
      <>
        <h1 className="text-center">
          NewsMonkey - Top Headlines on{' '}
          {this.capitalizeFirstLetter(this.props.category)}
        </h1>

        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults && this.state.articles.length < 100}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((elements) => {
                return (
                  <div className="col-md-3" key={elements.url}>
                    <Newsitem
                      title={
                        elements.title
                          ? elements.title.slice(0, 45)
                          : ''
                      }
                      description={
                        elements.description
                          ? elements.description.slice(0, 88)
                          : 'Not Describe'
                      }
                      imageUrl={elements.urlToImage || "https://via.placeholder.com/400x200?text=No+Image"}
                      newsUrl={elements.url}
                      author={elements.author}
                      date={elements.publishedAt}
                      source={
                        elements.source
                          ? elements.source.name
                          : 'Unknown'
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;