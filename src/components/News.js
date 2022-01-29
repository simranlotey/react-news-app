import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Nullimage from "./Images/nullimage.png";
import { API_DOMAIN, API_KEY } from "../config/api";
import "../index.css";

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 7,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      loading: true,
      totalResults: 0,
    };
    document.title = `${this.capitaLize(this.props.category)} - News App`;
  }

  updateNews = async () => {
    this.props.setProgress(15);
    let url = `${API_DOMAIN}${this.props.country}&category=${this.props.category}&apiKey=${API_KEY}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(35);
    let parsedData = await data.json();
    this.props.setProgress(70);
    if (data.status === 200) {
      console.log("OK. The request was executed successfully.")
    }
    else if (data.status === 429) {
      console.error("Too Many Requests. You made too many requests within a window of time and have been rate limited. ")
    }
    else if (data.status === 401) {
      console.error("Unauthorized. Your API key was missing from the request, or wasn't correct.")
    }
    else if (data.status === 500) {
      console.error("Server Error. Something went wrong on our side.")
    }
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  };

  componentDidMount = async () => {
    this.updateNews();
  };

  capitaLize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `${API_DOMAIN}${this.props.country}&category=${this.props.category}&apiKey=${API_KEY}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    return (
      <>
        <h1
          className="text-center"
          style={{ marginTop: "115px", color: "white" }}
        >
          News - Top {this.capitaLize(this.props.category)} Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container-fluid mt-4">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div
                    className="col-sm-12 col-md-6 col-lg-4 col-xl-3 my-3"
                    key={element.url}
                  >
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      author={element.author}
                      date={element.publishedAt}
                      channel={element.source.name}
                      alt="Card image cap"
                      publishedAt={element.publishedAt}
                      imageUrl={
                        element.urlToImage === null
                          ? Nullimage
                          : element.urlToImage
                      }
                      urlNews={element.url}
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





// FUNCTION BASED

/*
import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Nullimage from "./Images/nullimage.png";
import "../App.css";
import { API_DOMAIN, API_KEY } from "../config/api";

function News(props) {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  const capitaLize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  document.title = `${capitaLize(props.category)} - News App`;

  const updateNews = async () => {
    props.setProgress(15);
    let url = `${API_DOMAIN}${props.country}&category=${props.category}&apiKey=${API_KEY}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(35);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    const url = `${API_DOMAIN}${props.country}&category=${props.category}&apiKey=${API_KEY}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      <h1
        className="text-center"
        style={{ marginTop: "115px", color: "white" }}
      >
        News - Top {capitaLize(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container-fluid mt-4">
          <div className="row">
            {articles.map((element) => {
              return (
                <div
                  className="col-sm-12 col-md-6 col-lg-4 col-xl-3 my-3"
                  key={element.url}
                >
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    author={element.author}
                    date={element.publishedAt}
                    channel={element.source.name}
                    alt="Card image cap"
                    publishedAt={element.publishedAt}
                    imageUrl={
                      element.urlToImage === null
                        ? Nullimage
                        : element.urlToImage
                    }
                    urlNews={element.url}
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

News.defaultProps = {
  country: "us",
  pageSize: 7,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
*/