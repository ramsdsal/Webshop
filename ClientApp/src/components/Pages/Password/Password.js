import React, { Component } from 'react';
import {Form, Message,Header,Segment} from 'semantic-ui-react';


export class Password extends Component{
  constructor(props) {
      super(props);
  
      this.state = {
        isLoading: true,   
        activeItem: "Wachtwoord wijzigen", 
        
        currentPassword: "",
        newPassword: "",
  
        updateUserError: false,
        userUpdated: false,
        serverUpdateUserResponse: "",
        userFormIsLoading: false,
  
      };

      var _isMounted = false;
      fetch("/api/user/GetUserById/" + this.props.userId)
      .then(response => response.json())
      .then(data => {
        if (this._isMounted) {
          const user = data[0];
          this.setState({
            ...this.state,
            isLoading: false,
            password: user.password
          }); 
        }
      });
    }
  
    componentDidMount() 
    {
      this._isMounted = true;
    }
  
    componentWillUnmount()
    {
      this._isMounted = false;
    }
  
    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    updateUser = () => {
      this.setState({...this.state, userFormIsLoading: true})

      var jsonToSend = {
        id: this.props.userId,
        password: this.state.password
      };

      // /{currentPassword}/{newPassword}/{userId}
      fetch("/api/user/ChangePassword/" + this.state.currentPassword + "/" + this.state.newPassword + "/" + this.props.userId, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
      })
      .then(response => response.json())
      .then(data => {
        this.setState({...this.state, serverUpdateUserResponse: data.response, updateUserError: data.isError, userUpdated: data.userUpdated, userFormIsLoading: false})
      });
    };
  
  
    render() {
      return (
        <div>
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
                // type="password"
                size="massive"
                label="Huidig wachtwoord"
                placeholder="*****"
                name="currentPassword"
                value={this.state.currentPassword}
                onChange={this.handleChange}
              />
              <Form.Input
                // type="password"
                size="massive"
                label="Nieuw wachtwoord"
                placeholder="*****"
                name="newPassword"
                value={this.state.newPassword}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Button
              type='submit'
              disabled={
                !this.state.currentPassword
                || !this.state.newPassword
                || this.state.currentPassword === this.state.newPassword
              }
            >
             Wijzigen
            </Form.Button>
          </Form>
          </Segment>
          </div>
      );
    }
  }