import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  List,
 Header,Segment
} from "semantic-ui-react";
import { UserProfile } from '../UserProfile/UserProfile';


export class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      activeItem: "Gegevens",

      userId: 0,
      userName: "",
      userLastName: "",
      userMail: "",
      userBirthDate: "",
      userAddress: {}
    };
  }

  componentDidMount() {
    console.log(this.props.user.id)
    fetch("/api/User/GetUserByIdForUserProfile/" + this.props.user.id)
      .then(response => response.json())
      .then(data => {
        const user = data[0];
        this.setState({
          ...this.state,
          isLoading: false,
          userId: user.id,
          userName: user.firstName,
          userLastName: user.lastName,
          userMail: user.email,
          userBirthDate: user.birthDate,
          userAddress: user.currentAddress
        });
      });
  }


  render() {

    return (
      <UserProfile>

          <Header as="h2" attached="top">
            {this.state.activeItem}
          </Header>
          <Segment attached size="massive">
          
            <List>
              <List.Item>
                <List.Icon name='user' />
                <List.Content>{this.state.userName + " " + this.state.userLastName}</List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='marker'/>
                <List.Content>{this.state.userAddress.street + " " + this.state.userAddress.city + " " + this.state.userAddress.country + " " + this.state.userAddress.zipCode}</List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='mail' />
                <List.Content>
                  {this.state.userMail}
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  {" "}
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <Link className="nav-link" to={"/updateUser/" + this.state.userId}>
                        Aanpassen
                  </Link>
                </List.Content>
              </List.Item>
            </List>
          </Segment>

      </UserProfile>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authentication.user
  };
};

export default connect(mapStateToProps)(UserDetails);
