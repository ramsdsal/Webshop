import React, { Component } from "react";
import {
  Container,
  Grid,
  Image,
  Header,
  List,
  Divider,
  Segment
} from "semantic-ui-react";

export class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Segment
          inverted
          vertical
          style={{ margin: "3em 0em 0em", padding: "3em 0em" }}
        >
          <Container textAlign="center">
            <h3>Media Mania</h3>
          </Container>
        </Segment>
      </div>
    );
  }
}
