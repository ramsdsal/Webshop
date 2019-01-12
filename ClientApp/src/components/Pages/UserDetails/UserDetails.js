import React, { Component } from "react";
import { Link } from "react-router-dom";
import { List, Header, Segment } from "semantic-ui-react";


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

    var _isMounted = false;

    fetch("/api/User/GetUserByIdForUserProfile/" + this.props.userId)
    .then(response => response.json())
    .then(data => {

      if (this._isMounted) {
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
      }
    });
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount()
  {
    this._isMounted = false;
  }


  render() {
    var datetime =this.state.userBirthDate;
    var date = datetime.substr(0, 10);
    return (
      <div>
          <Header as="h2" attached="top">
            {this.state.activeItem}
          </Header>
          <Segment attached size="massive">
            {
              this.state.isLoading ? "Gebruikers profiel laden." : <List>
              <List.Item>
                <List.Icon name='user' />
                <List.Content>{this.state.userName + " " + this.state.userLastName}</List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='calendar' />
                <List.Content>{date}</List.Content>
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
            }         
          </Segment>
        </ div>
    );
  }
}