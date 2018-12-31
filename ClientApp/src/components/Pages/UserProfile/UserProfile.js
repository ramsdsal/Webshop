import React, { Component } from 'react';
import './UserProfile.css';
import { Container, Grid, Segment, Header, Menu } from 'semantic-ui-react';


export class UserProfile extends Component{
    constructor()
    {
        super();
        this.state = { user : "isLoading", activeItem: 'bio' }
        fetch("/api/User/2")
            .then(response => response.json())
            .then(data => {
            console.log(data)
             this.setState({...this.state, user : data[0]})});
        
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
                    <Menu.Item name='bio' active={activeItem === 'bio'} onClick={this.handleItemClick}/>
                    <Menu.Item name='pics' active={activeItem === 'pics'} onClick={this.handleItemClick} />
                    <Menu.Item name='companies' active={activeItem === 'companies'} onClick={this.handleItemClick}/>
                    <Menu.Item name='links' active={activeItem === 'links'} onClick={this.handleItemClick} />
                </Segment>
                </Menu>
                </Grid.Column>

                <Grid.Column stretched width={12}>
                <Segment>
                   {this.state.activeItem}
                </Segment>
            </Grid.Column>
        </Grid>
        </Container>
        )
    }
}