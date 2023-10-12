import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Loading from "../Loading/Loading";
import NewsItem from "../NewsItem/NewsItem";
import NullImage from "../../components/Images/nullImage.png";
import { useDispatch, useSelector } from "react-redux";
import { searchArticle } from "../../store/action";
import { useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { header, noFound, searching } from "../../config/config";
import { Container, Header, card } from "./index";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [totalArticles, setTotalArticle] = useState(0);
  const { articles, loading } = useSelector((state) => state.search);
  const { query } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchArticle(query));
  }, [query, dispatch]);

  useEffect(() => {
    setSearchQuery(query);
    setTotalArticle(articles.totalArticles);
  }, [query, articles]);

  const capitaLize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  document.title =
    totalArticles === 0
      ? noFound
      : loading
      ? searching
      : `${capitaLize(searchQuery)} - News`;

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header>
            {totalArticles === 0 ? noFound : header(capitaLize(searchQuery))}
          </Header>
          <Container>
            <Row>
              {articles?.articles?.map((element) => {
                return (
                  <Col sm={12} md={6} lg={4} xl={3} style={card} key={uuidv4()}>
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      published={element.publishedAt}
                      channel={element.source.name}
                      alt="News image"
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
        </>
      )}
    </>
  );
}

export default Search;
