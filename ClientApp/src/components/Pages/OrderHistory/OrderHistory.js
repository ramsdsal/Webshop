import React, { Component } from 'react';
import { connect } from "react-redux";
import { Table, Header,Segment, Icon, Modal, Button} from 'semantic-ui-react';
import { UserProfile } from '../UserProfile/UserProfile';
import { OrderDetails } from '../OrderDetails/OrderDetails';

export class OrderHistory extends Component{
      
constructor(props) {

    super(props);
    this.state = { orders: [] , activeItem: 'Bestellingen'};
}

componentDidMount() {
    fetch("/api/order/GetOrdersByUserId/1")
    .then(response => response.json())
    .then(data => {
      var orders = data;
      this.setState({
        ...this.state,
        orders: orders
      });
    });
  }

renderOrderTable() {
return (
    console.log(this.props),
    <Table celled>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Datum</Table.HeaderCell>
                <Table.HeaderCell>Details</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {this.state.orders.map(order => (                
                <Table.Row key= {order.id}>
                    <Table.Cell>{order.id}</Table.Cell>
                    <Table.Cell>{order.orderStatus}</Table.Cell>
                    <Table.Cell>{order.date}</Table.Cell>
                    <Table.Cell>
                        <Modal
                        trigger={
                            <Button icon labelPosition="right">
                                <Icon name="eye" />
                                    Details
                            </Button>
                        }

                        closeIcon
                        centered
                        >
                        <Header icon="eye" content={"Bestelling informatie"} />
                        <Modal.Content>
                            <OrderDetails orderId={order.id} />
                        </Modal.Content>
                        </Modal>
                    </Table.Cell>
                </Table.Row>
            ))}
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
    console.log("HEEE")
    return {
      user: state.authentication.user
    };
  };
  
export default connect(mapStateToProps)(OrderHistory);
  
