import React, { Component } from "react";
import { Container, Segment, Header, Table, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./ManageOrders.css";

export class ManageOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      allOrders: {},
      finishedOrders: {},
      pendingOrders: {}
    };
  }

  componentDidMount() {
    fetch("/api/order/getOrdersForManage/")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        var orders = data;
        this.setState({
          ...this.state,
          isLoading: false,
          finishedOrders: orders.finishedOrders,
          pendingOrders: orders.pendingOrders
        });
      });
  }

  renderPage() {
    return (
      <Container style={{ marginTop: "7em" }}>
        <Header as="h2" attached="top">
          Niet afgemaakte bestellingen
        </Header>
        <Segment>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Naam</Table.HeaderCell>
                <Table.HeaderCell>Datum aangemaakt</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.pendingOrders.map((order, index) => {
                console.log(order);
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{order.id}</Table.Cell>
                    <Table.Cell>{order.name}</Table.Cell>
                    <Table.Cell>{order.date}</Table.Cell>
                    <Table.Cell>
                      {order.orderStatus == 1 ? (
                        <Label color="green" horizontal>
                          Geacepteerd
                        </Label>
                      ) : (
                        <Label color="yellow" horizontal>
                          Vastgehouden
                        </Label>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className="nav-link"
                        to={"/updateorder/" + order.id}
                      >
                        Details
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Segment>

        <Header as="h2" attached="top">
          Afgemaakte bestellingen
        </Header>
        <Segment>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Naam</Table.HeaderCell>
                <Table.HeaderCell>Datum aangemaakt</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.finishedOrders.map((order, index) => {
                console.log(order);
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{order.id}</Table.Cell>
                    <Table.Cell>{order.name}</Table.Cell>
                    <Table.Cell>{order.date}</Table.Cell>
                    <Table.Cell>{order.orderStatus}</Table.Cell>
                    <Table.Cell>
                      <Link
                        className="nav-link"
                        to={"/updateorder/" + order.id}
                      >
                        Details
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Segment>
      </Container>
    );
  }

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
