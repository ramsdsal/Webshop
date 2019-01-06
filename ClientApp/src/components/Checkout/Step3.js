import React, { Component } from "react";
import { Message, Segment } from "semantic-ui-react";

class Step3 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    if (this.props.bezorgen === "klantadres") {
      fetch("api/user/getuseradress/" + this.props.user.id, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          this.setState({
            ...this.state,
            adress: data
          });
        });
    } else {
      console.log("Nieuw adress");
    }
  }

  render() {
    return (
      <Segment.Group>
        <Message
          info
          content="Door op 'Kopen' te klikken, bevestig ik dat ik de Algemene Voorwaarden, het Privacy Statement en de Retourvoorwaarden heb gelezen en hiermee akkoord ga."
        />
        <Segment>Top</Segment>
        <Segment.Group>
          <Segment>Nested Top</Segment>
          <Segment>Nested Middle</Segment>
          <Segment>Nested Bottom</Segment>
        </Segment.Group>
        <Segment.Group horizontal>
          <Segment>Top</Segment>
          <Segment>Middle</Segment>
          <Segment>Bottom</Segment>
        </Segment.Group>
        <Segment>Bottom</Segment>
      </Segment.Group>
    );
  }
}

export default Step3;
