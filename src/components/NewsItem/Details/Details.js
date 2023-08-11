import React from "react";
import PropTypes from "prop-types";
import { summary, newsChannel, lastUpdate } from "../../../config/config";
import { details, summarry, text } from "./index";

function Details(props) {
  const { channel, published } = props;
  return (
    <details style={details}>
      <summary style={summarry}>{summary}</summary>
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