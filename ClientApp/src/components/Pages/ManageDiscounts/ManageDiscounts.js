import React, { Component } from "react";
import { Container, Segment, Header, Table, Form, Message, Icon, Radio } from "semantic-ui-react";
import "./ManageDiscounts.css";

export class ManageDiscounts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      allDiscounts: [],

      addDiscountError: false,
      discountAdded: false,
      serverDiscountResponse: "",
      discountFormIsLoading: false,

      discountPercentage: 0,
      discountName: "",
      discountDescription: "",

      currentDiscountId: "",
    };
  }

  addDiscount = () => {
    this.setState({ ...this.state, discountFormIsLoading: true });

    var today = new Date();
    var dateFrom =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" + //06:32:00
      today.getDate() +
      " " +
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds();

    var jsonToSend = {
      percentage: this.state.discountPercentage,
      name: this.state.discountName,
      description: this.state.discountDescription,
      dateOn: dateFrom,
      current: 0
    };

    fetch("/api/discount/AddDiscount", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jsonToSend)
    })
      .then(response => response.json())
      .then(data => {
        var newDiscount = {
          percentage: this.state.discountPercentage,
          dateOn: dateFrom,
          dateOff: "",
          name: this.state.discountName,
          description: this.state.discountDescription,
          current: 0,
          id: data.id
        };

        if (data.discountAdded) {
          var previousDiscount = this.state.allDiscounts[this.state.allDiscounts.length - 1];
          if (previousDiscount != null) {
            previousDiscount.dateOff = dateFrom;
          }

          var discountsInState = this.state.allDiscounts;
          discountsInState.push(newDiscount);
        }

        this.setState({
          ...this.state,
          serverDiscountResponse: data.response,
          addDiscountError: data.isError,
          discountAdded: data.priceAdded,
          discountFormIsLoading: false
        });
      });
  };

  changeCurrentDiscount = (discount) =>
  {
    console.log("discount to change: " + discount.id)
    fetch("/api/discount/UpdateDiscount/" + discount.id)
    .then(response => response.json())
    .then(data => {
      this.setState({
        ...this.state,
        allDiscounts: data
      });
    });
  }

  componentDidMount() {
    fetch("/api/discount/GetAll")
      .then(response => response.json())
      .then(data => {
        var discounts = data;
        this.setState({
          ...this.state,
          isLoading: false,
          allDiscounts: discounts
        });
      });
  }

  renderPage() {
    return (
      <Container style={{ marginTop: "7em" }}>
        <Header as="h2" attached="top">
          Kortingen
        </Header>
        <Segment>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Naam</Table.HeaderCell>
                <Table.HeaderCell>Beschrijving</Table.HeaderCell>
                <Table.HeaderCell>Percentage</Table.HeaderCell>
                <Table.HeaderCell>Huidige</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.allDiscounts.map((discount, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{discount.id}</Table.Cell>
                    <Table.Cell>{discount.name}</Table.Cell>
                    <Table.Cell>{discount.description}</Table.Cell>
                    <Table.Cell>{discount.percentage}</Table.Cell>
                    <Table.Cell>
                        <Radio
                          label='Selecteer'
                          name='radioGroup'
                          value='that'
                          checked={discount.current == 1}
                          onChange={this.changeCurrentDiscount.bind(this, discount)}
                        />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
          <Form
            size="big"
            onSubmit={this.addDiscount}
            loading={this.state.discountFormIsLoading}
            error={this.state.addDiscountError}
            success={this.state.discountAdded}
          >
            {this.state.addDiscountError ? (
              <Message
                size="large"
                error
                header="Korting kon niet toegevoegd worden."
                content={this.state.serverDiscountResponse}
              />
            ) : null}
            {this.state.discountAdded ? (
              <Message
                size="large"
                success
                header="Korting succesvol toegevoegd"
                content={this.state.serverDiscountResponse}
              />
            ) : null}
            <Form.Group unstackable widths={2}>
              <Form.Input
                required
                label="Naam"
                placeholder="Naam"
                name="discountName"
                type="text"
                onChange={this.handleChange}
              />
              <Form.Input
                required
                label="Beschrijving"
                placeholder="Beschrijving"
                name="discountDescription"
                type="text"
                onChange={this.handleChange}
              />
              <Form.Input
                required
                label="Percentage"
                placeholder="15"
                name="discountPercentage"
                type="number"
                min="0"
                max="99"
                step="1"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Button
              color="blue"
              type="submit"
              disabled=
              {
                !this.state.discountPercentage
                || !this.state.discountDescription
                || !this.state.discountName
              }
            >
              <Icon name="plus" /> Toevoegen
            </Form.Button>
          </Form>
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
