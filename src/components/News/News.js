import React, { useState, useEffect } from "react";
import NewsItem from "../NewsItem/NewsItem";
import Spinner from "../Spinner/Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Nullimage from "../../components/Images/nullimage.png";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import { endpointPath } from "../../config/api";
import { header } from "../../config/config";


const Header = styled.h1`
  text-align: center;
  margin-top: 120px;
  color: #fff;
  margin-bottom: 20px;
`

const Container = styled.div`
  width: 93%;
  padding-right: (1.5rem, 0.75rem);
  padding-left: (1.5rem, 0.75rem);
  margin-right: auto;
  margin-left: auto;
`
const card = {
  marginTop: "10px",
  marginBottom: "50px"
}

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
    const url = endpointPath(props.country, props.category, page, props.pageSize);
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(35);
    let parsedData = await data.json();
    props.setProgress(70);
    switch (data.status) {
      case 200: {
        if (data.status === 200)
          console.log("OK. The request was executed successfully.");
        break;
      }
      case 429: {
        if (data.status === 429)
          console.error("Too Many Requests. You made too many requests within a window of time and have been rate limited.");
        break;
      }
      case 401: {
        if (data.status === 401)
          console.error("Unauthorized. Your API key was missing from the request, or wasn't correct.")
        break;
      }
      case 500: {
        if (data.status === 500)
          console.error("Server Error. Something went wrong on our side.")
        break;
      }
      default:
        return
    }
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
    const url = endpointPath(props.country, props.category, page + 1, props.pageSize);
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      <Header>
        {header(capitaLize(props.category))}
      </Header>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <Container>
          <Row>
            {articles.map((element) => {
              return (
                <Col
                  sm={12} md={6} lg={4} xl={3} style={card}
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
                </Col>
              );
            })}
          </Row>
        </Container>
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







// CLASS BASED


/*
import React, { Component } from "react";
import NewsItem from "../Newsitem/Newsitem";
import Spinner from "../Spinner/Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Nullimage from "../../components/Images/nullimage.png";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import { endpointPath } from "../../config/api";
import { header } from "../../config/config";


const Header = styled.h1`
  text-align: center;
  margin-top: 120px;
  color: #fff;
  margin-bottom: 20px;
`

const Container = styled.div`
  width: 93%;
  padding-right: (1.5rem, 0.75rem);
  padding-left: (1.5rem, 0.75rem);
  margin-right: auto;
  margin-left: auto;
`
const card = {
  marginTop: "10px",
  marginBottom: "50px"
}
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
    const url = endpointPath(this.props.country, this.props.category, this.state.page, this.props.pageSize);
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(35);
    let parsedData = await data.json();
    this.props.setProgress(70);
    switch (data.status) {
      case 200: {
        if (data.status === 200)
          console.log("OK. The request was executed successfully.");
        break;
      }
      case 429: {
        if (data.status === 429)
          console.error("Too Many Requests. You made too many requests within a window of time and have been rate limited.");
        break;
      }
      case 401: {
        if (data.status === 401)
          console.error("Unauthorized. Your API key was missing from the request, or wasn't correct.")
        break;
      }
      case 500: {
        if (data.status === 500)
          console.error("Server Error. Something went wrong on our side.")
        break;
      }
      default:
        return
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
    const url = endpointPath(this.props.country, this.props.category, this.state.page, this.props.pageSize);
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
        <Header
          className="text-center"
        >
          {header(this.capitaLize(this.props.category))}
        </Header>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <Container>
            <Row>
              {this.state.articles.map((element) => {
                return (
                  <Col
                    sm={12} md={6} lg={4} xl={3} style={card}
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
                  </Col>
                );
              })}
            </Row>
          </Container>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
*/
