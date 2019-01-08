import React, { Component } from 'react';
import {Form, Message,Header,Segment} from 'semantic-ui-react';
import { UserProfile } from '../UserProfile/UserProfile';


export class Password extends Component{
  constructor(props) {
      super(props);
  
      this.state = {
        isLoading: true,   
        activeItem: "Wachtwoord wijzigen", 
        
        password: "",
  
        updateUserError: false,
        userUpdated: false,
        serverUpdateUserResponse: "",
        userFormIsLoading: false,
  
      };
    }
  
    componentDidMount() {
      fetch("/api/user/GetUserById/" + this.props.userId)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          const user = data[0];
          this.setState({
            ...this.state,
            isLoading: false,
            password: user.password
          });
        });
    }
  
    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    updateUser = () => {
      this.setState({...this.state, userFormIsLoading: true})
      var jsonToSend = {
        id: this.props.userId,
        password: this.state.password
      };
  
      fetch("/api/user/password", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonToSend)
      })
      .then(response => response.json())
      .then(data => {
        this.setState({...this.state, serverUpdateUserResponse: data.response, updateUserError: data.isError, userUpdated: data.userUpdated, userFormIsLoading: false})
      });
    };
  
  
    render() {

      return (
          <UserProfile>
          <Header as="h2" attached="top">
          {this.state.activeItem}
          </Header>
          <Segment attached>
          <Form 
            onSubmit={this.updateUser}
            loading = {this.state.userFormIsLoading}
            error={this.state.updateUserError}
            success={this.state.userUpdated}
          >
          {
              this.state.updateUserError ? <Message size='large' error 
              header="Gebruiker kon niet geupdate worden" 
              content={this.state.serverUpdateUserResponse}/>
              :
              null
          }
          {
              this.state.userUpdated ? <Message size='large' success 
              header="Gebruiker succesvol aangepast" 
              content={this.state.serverUpdateUserResponse}/>
              : 
              null
          }
            <Form.Group unstackable widths={2}>
              <Form.Input
                type="password"
                size="massive"
                label="Nieuw wachtwoord"
                placeholder="*****"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Button
              type='submit'
              disabled={
                !this.state.password
              }
            >
             Wijzigen
            </Form.Button>
          </Form>
          </Segment>
  </UserProfile>
      );
    }
  }
    