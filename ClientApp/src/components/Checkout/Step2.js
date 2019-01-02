import React, { Component } from "react";
import { Form, Grid, Button, Icon, Select, Message } from "semantic-ui-react";
import "./Checkout.css";

const formValid = ({ payment }) => {
  let valid = true;
  if (payment === "") valid = false;

  return valid;
};

class Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValid: true
    };
  }
  saveAndContinue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.props)) {
      this.props.nextStep();
    } else {
      this.setState({ ...this.state, formValid: false });
    }
  };

  render() {
    const options = [
      { key: "iDeal", text: "iDeal", value: "iDeal" },
      { key: "Paypal", text: "Paypal", value: "Paypal" },
      { key: "CreditCard", text: "CreditCard", value: "CreditCard" },
      { key: "MasterPass", text: "MasterPass", value: "MasterPass" },
      {
        key: "Betaalgemak (Betalen in termijnen)",
        text: "Betaalgemak (Betalen in termijnen)",
        value: "Betaalgemak (Betalen in termijnen)"
      },
      { key: "Cadeaukaart", text: "Cadeaukaart", value: "Cadeaukaart" }
    ];

    return (
      <Grid
        textAlign="center"
        style={{ height: "100%" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          {!this.state.formValid && this.props.payment === "" ? (
            <Message negative>
              <Message.Header>Ongeldige formulier</Message.Header>
              <p>Kies een betaalMethode</p>
            </Message>
          ) : (
            ""
          )}
          <Form color="green">
            <Form.Field
              error={!this.state.formValid && this.props.payment === ""}
              control={Select}
              label="Betaalwijze"
              options={options}
              placeholder="Betaalmethode"
              onChange={this.props.handleChange("payment")}
              defaultValue={this.props.payment}
            />
            <Button
              icon
              labelPosition="left"
              onClick={this.back}
              size="big"
              style={{ marginTop: "5em" }}
            >
              Terug
              <Icon name="left arrow" />
            </Button>
            <Button
              style={{ marginTop: "5em" }}
              icon
              labelPosition="right"
              onClick={this.handleSubmit}
              size="big"
            >
              Kopen
              <Icon name="right arrow" />
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Step2;
