import React from "react";
import { Button, Card } from "react-bootstrap";
import { author, summary, channel, lastUpdate } from "../../config/config"
import { card, img, btn, detail, sum, txt, text } from "./index"


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
