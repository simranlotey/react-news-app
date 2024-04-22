import React from "react";
import PropTypes from "prop-types";
import { summary, newsChannel, lastUpdate } from "../../../config/config";
import "./Details.css";

function Details(props) {
  const { channel, published } = props;

  return (
    <details className="details">
      <summary className="summary">{summary}</summary>
      <p className="channel">
        <span>Channel: </span>
        {newsChannel(channel)}
      </p>
      <p className="published">
        <span>Published at: </span>
        {lastUpdate(published)}
      </p>
    </details>
  );
}

Details.propTypes = {
  channel: PropTypes.string,
  published: PropTypes.string,
};

export default Details;
