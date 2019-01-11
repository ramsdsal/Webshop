import React, { Component } from "react";
import "./UserProfile.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Container,
  Grid,
  Segment,
  Header,
  Menu
} from "semantic-ui-react";

export class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,

      userId: 1
    };
  }

  // componentDidMount() {
  //   fetch("/api/User/1")
  //     .then(response => response.json())
  //     .then(data => {
  //       const user = data[0];
  //       this.setState({
  //         ...this.state,
  //         isLoading: false,
  //         userId: user.id
  //       });
  //     });
  // }


  render() {
    const PassLink = "/password/" + this.state.userId;
    return (
      <Container style={{ marginTop: "7em" }}>
        <Grid>
          <Grid.Column width={4}>
            <Header as="h2" attached="top">
              Instellingen
            </Header>
            <Menu fluid vertical>
              <Segment attached>
                <Menu.Item
                  name="Gegevens"
                  as={Link}
                  to="/userdetails"
                />
                <Menu.Item
                  name="Wachtwoord wijzigen"
                  as={Link}
                  to={PassLink}
                />
                <Menu.Item
                  name="Bestellingen"
                  as={Link}
                  to="/orderhistory"
                />
              </Segment>
            </Menu>
          </Grid.Column>
          <Grid.Column stretched width={12}>
            {this.props.children}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  console.log("skert")
  return {
    user: state.authentication.user
  };
};

export default connect(mapStateToProps)(UserProfile);
