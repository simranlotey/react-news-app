import React, { useState, useEffect } from "react";
import axios from "axios";
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

  const updatenews = async () => {
    try {
      props.setProgress(15);
      const response = await axios.get(endpointPath(props.country, props.category, page, props.pageSize));
      setLoading(true);
      props.setProgress(70);
      const parsedData = response.data;
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      props.setProgress(100);
    }
    catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    updatenews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    const response = await axios.get(endpointPath(props.country, props.category, page + 1, props.pageSize));
    setPage(page + 1);
    const parsedData = response.data;
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
