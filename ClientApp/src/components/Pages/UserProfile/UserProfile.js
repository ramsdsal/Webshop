import React, { Component } from 'react';
import './UserProfile.css';
import { Link} from "react-router-dom";
import { Container, Grid, Segment, Header, Menu, Form, Input } from 'semantic-ui-react';

export class UserProfile extends Component{
    constructor(props)
    {
        super(props);
        this.state = { user : "isLoading", activeItem: 'Gegevens' }

        fetch("/api/User/2").then(response => response.json()).then(data => {
            console.log(data)
            this.setState({...this.state, user : data[0]})
        });  
    }    

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {

        const { activeItem } = this.state

        if (this.state.user === "isLoading")
        {
            return <p>Loading...</p>
        }

        return (
        <Container style={{ marginTop: "7em" }}>
        <Grid>
            <Grid.Column width={4}>
            <Header as='h2' attached='top'>
                Instellingen
            </Header>
                <Menu fluid vertical  >
                <Segment attached >
                    <Menu.Item name='Gegevens'   active={activeItem === 'Gegevens'} onClick={this.handleItemClick}/>
                    <Menu.Item name='Wachtwoord wijzigen' as={Link} to="/password" active={activeItem === 'Wachtwoord wijzigen'} onClick={this.handleItemClick}/>
                    <Menu.Item name='Bestellingen' as={Link} to="/orderhistory" active={activeItem === 'Bestellingen'} onClick={this.handleItemClick} />
                </Segment>
                </Menu>
                </Grid.Column>
                <Grid.Column stretched width={12}>
                <Header as='h2' attached='top'>
                    {this.state.activeItem}
                </Header>
                <Segment attached>
                <Form>
                    <Form.Group>
                        <Form.Field  >
                        <h6>Voornaam</h6>
                        <Input placeholder={this.state.user.firstName} readOnly/>
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field >
                        <h6>Achternaam</h6>
                        <Input placeholder={this.state.user.lastName} readOnly/>
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field >
                        <h6>Geboortedatum</h6>
                        <Input type="text" onFocus = {this._onFocus} placeholder={this.state.user.birthDate} readOnly/>
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field >
                        <h6>E-mail</h6>
                        <Input placeholder={this.state.user.email} readOnly/>
                        </Form.Field>
                    </Form.Group>
                </Form>
                </Segment>
            </Grid.Column>
        </Grid>
        </Container>
        )
    }

    
}

// const mapStateToProps = state => {
//     return {
//       user: state.authentication.user,
      
//     };
// };

// export default UserProfile;
