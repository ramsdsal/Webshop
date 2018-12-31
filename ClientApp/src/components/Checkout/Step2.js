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

  render() {
    const options = [
      { key: "ing", text: "ING", value: "ING" },
      { key: "abn", text: "ABN-AMRO", value: "ABN-AMRO" }
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
              label="Betaal Bank"
              options={options}
              placeholder="Kies je bank"
              onChange={this.props.handleChange("payment")}
              defaultValue={this.props.payment}
            />
            <Button icon labelPosition="left" onClick={this.back} size="big">
              Terug
              <Icon name="left arrow" />
            </Button>
            <Button
              icon
              labelPosition="right"
              onClick={this.saveAndContinue}
              size="big"
            >
              Verder
              <Icon name="right arrow" />
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Step2;
