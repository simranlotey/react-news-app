import React from "react"
import { author, summary, channel, lastUpdate } from "../../config/config"
import { detail, sum, text } from "./index"


export default function Details(props) {

    return (
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
    )
}
