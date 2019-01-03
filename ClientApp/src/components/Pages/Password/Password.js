import React, { Component } from 'react';
import { Link} from "react-router-dom";
import { Container, Grid, Segment, Header, Menu, Form, Input , Button} from 'semantic-ui-react';


export class Password extends Component{
    constructor(props)
    {
        super(props);
        this.state = { activeItem: 'Wachtwoord wijzigen'  }
        
    }    

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })


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
                    <Menu.Item name='Bestellingen' active={activeItem === 'Bestellingen'} onClick={this.handleItemClick} />
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
                        <Form.Field>
                        <h6>Wachtwoord</h6>
                        <Input type="password"placeholder="********"/>
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field>
                        <h6>Wachtwoord herhaling</h6>
                        <Input type="password" placeholder="********"/>
                        </Form.Field>
                    </Form.Group>
                    <Button>Opslaan</Button>
                </Form>
                </Segment>
            </Grid.Column>
        </Grid>
        </Container>
        )
    }
}