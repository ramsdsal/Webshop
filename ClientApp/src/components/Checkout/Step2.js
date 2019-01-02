import React, { Component } from "react";
import { Form, Grid, Button, Icon, Select } from "semantic-ui-react";

class Step2 extends Component {
  saveAndContinue = e => {
    e.preventDefault();
    this.props.nextStep();
  };
  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  StoreOrder = () => {};

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
          <Form color="green">
            <Form.Field
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
              onClick={this.saveAndContinue}
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
