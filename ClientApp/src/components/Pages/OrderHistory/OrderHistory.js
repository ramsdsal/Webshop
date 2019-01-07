import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Grid, Segment, Header, Menu, Table} from 'semantic-ui-react';

export class OrderHistory extends Component{
      
    constructor(props) {

        super(props);
        this.state = { orders: [] , activeItem: 'Bestellingen'};
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    renderOrderTable() {
    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Id</Table.HeaderCell>
                    <Table.HeaderCell>Postcode</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell>Datum</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {this.state.orders.map(order => (                
                    <Table.Row key= {order.id}>
                        <Table.Cell>{order.id}</Table.Cell>
                        <Table.Cell>{order.zipCode}</Table.Cell>
                        <Table.Cell>{order.orderStatus}</Table.Cell>
                        <Table.Cell>{order.date}</Table.Cell>
                        <Table.Cell>Details</Table.Cell>
                    </Table.Row>
                ))}
                <Table.Row key= {1}>
                        <Table.Cell>Mark</Table.Cell>
                        <Table.Cell>Mark1</Table.Cell>
                        <Table.Cell>Mark2</Table.Cell>
                        <Table.Cell>Mark3</Table.Cell>
                        <Table.Cell>Mark4</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    
    );
    }

    render() {
    let contents = this.renderOrderTable();

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
                <Menu.Item name='Wachtwoord wijzigen' as={Link} to="/password" active={activeItem === 'Wachtwoord wijzigen'} onClick={this.handleItemClick}/>
                <Menu.Item name='Bestellingen'  active={activeItem === 'Bestellingen'} onClick={this.handleItemClick} />
            </Segment>
            </Menu>
            </Grid.Column>
            <Grid.Column stretched width={12}>
            <Header as='h2' attached='top'>
            {this.state.activeItem}
            </Header>
            <Segment attached>
                {contents}
            </Segment>
        </Grid.Column>
    </Grid>
    </Container>
    )
  }
}

const mapStateToProps = state => {
    return { user: state.authentication.user };
};
  
export default connect(mapStateToProps)(OrderHistory);
