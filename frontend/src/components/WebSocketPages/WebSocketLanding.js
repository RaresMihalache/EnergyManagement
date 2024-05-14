import React, { Component } from "react";
import StompClient from "react-stomp-client";

class WebSocketLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latestMessage: null,
    };
    this.handleMessage = this.handleMessage.bind(this);
  }

  handleMessage(stompMessage) {
    this.setState({
      latestMessage: stompMessage,
    });
  }

  render() {
    const headers = {
      Authorization: "Bearer " + `${sessionStorage.getItem("jwtToken")}`,
    };
    const { latestMessage } = this.state;
    console.log(headers);
    return (
      <StompClient
        headers={headers}
        endpoint="ws://localhost:8080/sensors"
        topic="topic"
        onMessage={this.handleMessage}
      >
        <div>
          {latestMessage
            ? `Latest message received: ${latestMessage}`
            : "No message received yet"}
        </div>
      </StompClient>
    );
  }
}

export default WebSocketLanding;
