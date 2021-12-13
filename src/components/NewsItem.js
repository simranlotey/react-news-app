import React from "react";
import "../App.css";

function NewsItem(props) {
  return (
    <>
      <div
        className="card shadow"
        style={{ backgroundColor: "rgb(4 31 52)", color: "white" }}
      >
        <img className="card-img-top" src={props.imageUrl} alt={props.alt} />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text" style={{ color: "#b6b4b4" }}>
            {props.description}
          </p>
          <details style={{ marginBottom: "15px" }}>
            <summary style={{ "color": "#f5f5f5", "fontSize": "15px" }}>Author, Channel and Date</summary>
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
            className="btn"
            rel="noreferrer"
            target="_blank"
          >
            Read More
          </a>
        </div>
      </div>
    </>
  );
}

export default NewsItem;
