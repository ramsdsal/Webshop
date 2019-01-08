import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Form,
  Input, Header,Segment
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
      userBirthDate: ""
    };
  }

  componentDidMount() {
    fetch("/api/User/2")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const user = data[0];
        console.log(user);
        this.setState({
          ...this.state,
          isLoading: false,
          userId: user.id,
          userName: user.firstName,
          userLastName: user.lastName,
          userMail: user.email,
          userBirthDate: user.birthDate
        });
      });
  }


  render() {

    return (
      <UserProfile>
        <Header as="h2" attached="top">
          {this.state.activeItem}
        </Header>
        <Segment attached>
        <Form>
        <Form.Group>
            <Form.Field>
            <h6>Voornaam</h6>
            <Input placeholder={this.state.userName} readOnly />
            </Form.Field>
        </Form.Group>
        <Form.Group>
            <Form.Field>
            <h6>Achternaam</h6>
            <Input placeholder={this.state.userLastName} readOnly />
            </Form.Field>
        </Form.Group>
        <Form.Group>
            <Form.Field>
            <h6>Geboortedatum</h6>
            <Input
                type="text"
                onFocus={this._onFocus}
                placeholder={this.state.userBirthDate}
                readOnly
            />
            </Form.Field>
        </Form.Group>
        <Form.Group>
            <Form.Field>
            <h6>E-mail</h6>
            <Input placeholder={this.state.userMail} readOnly />
            </Form.Field>
        </Form.Group>
        </Form> 
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
