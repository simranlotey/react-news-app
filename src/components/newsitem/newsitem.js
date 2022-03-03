import React from "react";
import "../../components/newsitem/newsitem.css"

function NewsItem(props) {
  return (
    <>
      <div className="card">
        <img className="card-img-top" src={props.imageUrl} alt={props.alt} />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">
            {props.description}
          </p>
          <details style={{ marginBottom: "15px" }}>
            <summary className="summary">Author, Channel and Date</summary>
            <p className="card-text" style={{ marginBottom: "-3px" }}>
              <small className="text-muted">
                Author: {!props.author ? "Unknown" : props.author}
              </small>
            </p>
            <p className="card-text" style={{ marginBottom: "-3px" }}>
              <small className="text-muted">Channel: {props.channel}</small>
            </p>
            <p className="card-text" style={{ marginBottom: "15px" }}>
              <small className="text-muted">
                Last updated: {new Date(props.date).toGMTString()}
              </small>
            </p>
          </details>
          <a
            href={props.urlNews}
            className="btn text-white shadow"
            rel="noreferrer"
            target="_blank"
          >
            Read more →
          </a>
        </div>
      </div>
    </>
  );
}

export default NewsItem;
