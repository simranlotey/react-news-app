import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsItem from "../NewsItem/NewsItem";
import Spinner from "../Spinner/Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import NullImage from "../../components/Images/nullimage.png";
import { v4 as uuidv4 } from "uuid";
import { Row, Col } from "react-bootstrap";
import { Header, Container, card } from "./index";
import { endpointPath } from "../../config/api";
import { header } from "../../config/config";

function News(props) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalArticles, setTotalArticle] = useState("");

  const capitaLize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const searchQuery = props.searchQuery;
  const category = props.category;
  const title = totalArticles === 0 ? "No Found" : searchQuery ? capitaLize(searchQuery) : capitaLize(category);
  document.title = `${capitaLize(title)} - News App`;

  const updatenews = async () => {
    try {
      props.setProgress(15);
      const response = await axios.get(
        endpointPath(props.country, props.category)
      );
      setLoading(true);
      props.setProgress(70);
      const parsedData = response.data;
      setArticles(parsedData.articles);
      setLoading(false);
      props.setProgress(100);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (props.news) {
      setArticles(props.news.articles);
      setTotalArticle(props.news.totalArticles);
      setLoading(false);
    } else {
      updatenews();
    }
    // eslint-disable-next-line
  }, [props.news]);

  return (
    <>
      <Header>
        {totalArticles === 0
          ? "No Found"
          : header(
              searchQuery ? capitaLize(searchQuery) : capitaLize(category)
            )}
      </Header>
      {props.loading || loading ? <Spinner /> : null}
      <InfiniteScroll dataLength={articles.length} loader={<Spinner />}>
        <Container>
          <Row>
            {articles.map((element) => {
              return (
                <Col
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                  style={card}
                  key={uuidv4()}
                >
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    published={element.publishedAt}
                    channel={element.source.name}
                    alt="Card image"
                    publishedAt={element.publishedAt}
                    imageUrl={
                      element.image === null ? NullImage : element.image
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
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
};

export default News;
