import React, { Component } from 'react';
import { Link} from "react-router-dom";
import { Container, Grid, Segment, Header, Menu, Form, Message} from 'semantic-ui-react';


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
    handleItemClick = (e, { name }) => this.setState({ activeItem: name }) 
  
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
      const { activeItem } = this.state

      return (
          <Container style={{ marginTop: "7em" }}>
          <Grid>
            <Grid.Column width={4}>
            <Header as='h2' attached='top'>
            Instellingen
            </Header>
                <Menu fluid vertical  >
                <Segment attached >
                    <Menu.Item name='Gegevens' as={Link} to="/userprofile" active={activeItem === 'Gegevens'} onClick={this.handleItemClick}/>
                    <Menu.Item name='Wachtwoord wijzigen' active={activeItem === 'Wachtwoord wijzigen'} onClick={this.handleItemClick}/>
                    <Menu.Item name='Bestellingen' as={Link} to="/orderhistory" active={activeItem === 'Bestellingen'} onClick={this.handleItemClick} />
                </Segment>
                </Menu>
                </Grid.Column>
                <Grid.Column stretched width={12}>
                <Header as='h2' attached='top'>
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
      </ Segment>
      </Grid.Column>
      </Grid>
  </Container>
      );
    }
  }
    