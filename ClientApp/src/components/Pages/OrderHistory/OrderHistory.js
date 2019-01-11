import React, { Component } from 'react';
import { connect } from "react-redux";
import { Table, Header,Segment} from 'semantic-ui-react';
import { UserProfile } from '../UserProfile/UserProfile';

export class OrderHistory extends Component{
      
constructor(props) {

    super(props);
    this.state = { orders: [] , activeItem: 'Bestellingen'};
}


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
return (
<UserProfile>
<Header as="h2" attached="top">
    {this.state.activeItem}
</Header>
<Segment attached>
{contents}
</Segment>
</UserProfile>  
    )
  }
}

const mapStateToProps = state => {
    return { user: state.authentication.user };
};
  
export default connect(mapStateToProps)(OrderHistory);
