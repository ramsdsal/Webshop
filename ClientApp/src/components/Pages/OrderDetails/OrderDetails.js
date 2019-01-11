import React, { Component } from "react";
import { Container, Table, Segment, Header, List } from "semantic-ui-react";
import "./OrderDetails.css";

export class OrderDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      orderedProducts: [],

      orderStatus: 0,
      orderName: "",
      orderStreet: "",
      orderCity: "",
      orderCountry: "",
      orderTotal: 0,
      orderTotalWithDiscount: 0,
      orderZipCode: "",
      orderDiscount: 0,
      orderDate: ""
    };
    
  }

  componentWillMount()
  {
    fetch("/api/order/GetOrderById/" + this.props.orderId)
      .then(response => response.json())
      .then(data => {
        const order = data[0];
        this.setState({
          ...this.state,
          isLoading: false,
          orderedProducts: order.products,
          orderStatus: order.orderStatus,
          orderName: order.name,
          orderStreet: order.street,
          orderTotal: order.total,
          orderTotalWithDiscount: order.totalWithDiscount,
          orderZipCode: order.zipCode,
          orderCity: order.city,
          orderCountry: order.country,
          orderDiscount: order.discount,
          orderDate: order.date,
        });
      });
  }

  render() {
    var datetime =this.state.orderDate;
var time = datetime.substr(11, 8);
var date = datetime.substr(8, 0);
    return(
      <Container style={{ marginTop: "7em" }}>

        <Header as="h2" attached="top">
          Informatie
        </Header>
        <Segment attached size="massive">
        
          <List>
            <List.Item>
              <List.Icon name='user' />
              <List.Content>{this.state.orderName}</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='marker'/>
              <List.Content>                
                <List.Content>{this.state.orderStreet + " " + this.state.orderCity + " " + this.state.orderCountry + " " + this.state.orderZipCode}</List.Content>
                </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='euro' />
              <List.Content>
                {"Prijs na korting: " + this.state.orderTotalWithDiscount}
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                {"Korting: " + this.state.orderDiscount + "%"}
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                {"Bestelling status: " + this.state.orderStatus }
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                {"Datum: " + time }
              </List.Content>
            </List.Item>
          </List>
        </Segment>

        <Header as="h2" attached="top">
          Producten
        </Header>
        <Segment attached>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Naam</Table.HeaderCell>
                  <Table.HeaderCell>Hoeveelheid</Table.HeaderCell>
                  <Table.HeaderCell>Prijs</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.state.orderedProducts.map((product, index) => {
                  return (
                    <Table.Row key={index}>
                      <Table.Cell>{product.title}</Table.Cell>
                      <Table.Cell>{product.quantity}</Table.Cell>
                      <Table.Cell>{product.price * product.quantity}</Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
        </Segment>
      </Container>
    );
  }
}
