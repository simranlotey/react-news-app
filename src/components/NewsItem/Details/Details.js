import React from "react";
import PropTypes from "prop-types";
import { summary, newsChannel, lastUpdate } from "../../../config/config";
import { detail, sum, text } from "../index";

function Details(props) {
  const { channel, published } = props;
  return (
    <details style={detail}>
      <summary style={sum}>{summary}</summary>
      <p style={text}>{newsChannel(channel)}</p>
      <p style={text}>{lastUpdate(published)}</p>
    </details>
  );
}

Details.propTypes = {
  channel: PropTypes.string,
  published: PropTypes.string,
};

export default Details