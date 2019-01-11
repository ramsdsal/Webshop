import React, { Component } from "react";
import "./UserProfile.css";
import { connect } from "react-redux";
import {
  Container,
  Grid,
  Header,
} from "semantic-ui-react";
import { OrderHistory } from "../OrderHistory/OrderHistory";

export class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,

      userId: 1
    };
  }

  render() {
    
    return (
      <Container style={{ marginTop: "7em" }}>
        <Grid>
          <Grid.Column width={4}>
            <Header as="h2" attached="top">
              Instellingen
            </Header>
            {/* <Menu fluid vertical>
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
            </Menu> */}
          </Grid.Column>
          <Grid.Column stretched width={12}>
            <OrderHistory />
            {/* {this.props.children} */}
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
