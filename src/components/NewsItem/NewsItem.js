import React from "react";
import { Button, Card } from 'react-bootstrap';
import { author, summary, channel, lastUpdate } from "../../config/config"
const card = {
  borderRadius: "15px",
  backgroundColor: "rgb(41, 47, 51)",
  color: "#fff"
}

const img = {
  borderTopLeftRadius: "15px",
  borderTopRightRadius: "15px",
}

const btn = {
  backgroundColor: "#005abb",
  borderRadius: "12px",
  fontWeight: "bold",
  color: "#fff",
  boxShadow: "0 30px 36px 0 rgba(0, 0, 0, 0.2)",
}

const detail = {
  marginBottom: "15px"
}

const sum = {
  color: "#f5f5f5",
  fontSize: "15px"
}

const txt = {
  color: "#b6b4b4",
}

const text = {
  color: "#6c757d",
  marginBottom: "3px",
  marginTop: "4px",
  fontSize: "12px",
  opacity: 1
}


function NewsItem(props) {
  return (
    <>
      <Card style={card}>
        <Card.Img style={img} variant="top" src={props.imageUrl} alt={props.alt} />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text style={txt}>
            {props.description}
          </Card.Text>
          <details style={detail}>
            <summary style={sum}>{summary}</summary>
            <p style={text}>
              {author(props.author)}
            </p>
            <p style={text}>
              {channel(props.channel)}
            </p>
            <p style={text}>
              {lastUpdate(props.date)}
            </p>
          </details>
          <Button href={props.urlNews} target="_blank" style={btn}>Read more →</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default NewsItem;
