import React, { Component } from "react";
import {
  Container,
  Form,
  Segment,
  Header,
  Table,
  Icon,
  Button,
  Message
} from "semantic-ui-react";
import "./UpdateOrder.css";

export class UpdateOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      orderedProducts: {},

      orderStatus: 0,
      orderName: "",
      orderStreet: "",
      orderTotal: 0,
      orderTotalWithDiscount: 0,
      orderZipCode: "",

      //Form
      formIsLoading: false,
      updateFormError: false,
      orderUpdated: false,
      serverUpdateOrderResponse: ""
    };
  }

  componentDidMount() {
    fetch("/api/order/GetOrderById/" + this.props.orderId)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const order = data[0];
        this.setState({
          ...this.state,
          isLoading: false,
          orderedProducts: order.products,
          orderStatus: order.orderStatus,
          orderName: order.name,
          orderStreet: order.street,
          orderTotal: order.total,
          orderTotalWithDiscount: order.TotalWithDiscount,
          orderZipCode: order.zipCode
        });
      });
  }

  renderPage() {
    return (
      <Container style={{ marginTop: "7em" }}>
        <Header>
          {this.state.orderStatus === 0
            ? "Bestelling status: Niet geaccepteerd"
            : "Bestelling status: Geaccepteerd"}
        </Header>
        <Header as="h2" attached="top">
          Producten
        </Header>
        <Segment>
          <Form
            size="big"
            loading={this.state.formIsLoading}
            error={this.state.updateFormError}
            success={this.state.orderUpdated}
          >
            {this.state.updateFormError ? (
              <Message
                size="large"
                error
                // header="Product kon niet geupdate worden"
                content={this.state.serverUpdateOrderResponse}
              />
            ) : null}
            {this.state.orderUpdated ? (
              <Message
                size="large"
                success
                // header="Product succesvol aangepast"
                content={this.state.serverUpdateOrderResponse}
              />
            ) : null}
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Product ID</Table.HeaderCell>
                  <Table.HeaderCell>Naam</Table.HeaderCell>
                  <Table.HeaderCell>Hoeveelheid</Table.HeaderCell>
                  <Table.HeaderCell>Hoeveelheid in voorraad</Table.HeaderCell>
                  <Table.HeaderCell>Prijs</Table.HeaderCell>
                  <Table.HeaderCell textAlign="right" />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.state.orderedProducts.map((product, index) => {
                  return (
                    <Table.Row key={index}>
                      <Table.Cell>{product.id}</Table.Cell>
                      <Table.Cell>{product.title}</Table.Cell>
                      <Table.Cell>{product.quantity}</Table.Cell>
                      <Table.Cell>{product.stockQuantity}</Table.Cell>
                      <Table.Cell>{product.price}</Table.Cell>
                      <Table.Cell textAlign="right">
                        <Button
                          disabled={this.state.orderStatus === 1}
                          onClick={this.orderProduct.bind(
                            this,
                            product.id,
                            product.quantity,
                            product
                          )}
                        >
                          Bestel product
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
            <Form.Button
              onClick={this.updateOrder}
              color="blue"
              type="submit"
              disabled={this.state.orderStatus === 1}
            >
              <Icon name="write" /> Bestelling accepteren
            </Form.Button>
          </Form>
        </Segment>
      </Container>
    );
  }

  orderProduct = (productId, quantity, product) => {
    this.setState({ ...this.state, formIsLoading: true });
    fetch("/api/order/OrderProduct/" + productId + "/" + quantity, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.orderUpdated) {
          product.stockQuantity = data.newQuantity;
        }
        this.setState({
          ...this.state,
          serverUpdateOrderResponse: data.response,
          updateFormError: data.isError,
          orderUpdated: data.orderUpdated,
          formIsLoading: false
        });
      });
  };

  updateOrder = () => {
    this.setState({ ...this.state, formIsLoading: true });
    fetch("/api/order/ApproveOrder/" + this.props.orderId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          ...this.state,
          orderStatus: data.orderStatus,
          serverUpdateOrderResponse: data.response,
          updateFormError: data.isError,
          orderUpdated: data.orderUpdated,
          formIsLoading: false
        });
      });
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  render() {
    const contents = this.state.isLoading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderPage()
    );

    return contents;
  }
}
