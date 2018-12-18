import React, { Component } from "react";
import { Form, Grid } from "semantic-ui-react";

class Step1 extends Component {
  saveAndContinue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values } = this.props;

    return (
      <Grid
        textAlign="center"
        style={{ height: "100%" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Form color="green">
            <Form.Field>
              <label>Naam</label>
              <input
                placeholder="Naam"
                onChange={this.props.handleChange("name")}
                defaultValue={values.name}
                size="big"
              />
            </Form.Field>
            <Form.Field>
              <label>Straat</label>
              <input
                placeholder="Straat"
                onChange={this.props.handleChange("street")}
                defaultValue={values.street}
                size="big"
              />
            </Form.Field>
            <Form.Field>
              <label>Postcode</label>
              <input
                placeholder="postcode"
                onChange={this.props.handleChange("zipcode")}
                defaultValue={values.zipcode}
                size="big"
              />
            </Form.Field>
            <Form.Field>
              <label>Woonplaats</label>
              <input
                placeholder="Woonplaats"
                onChange={this.props.handleChange("city")}
                defaultValue={values.city}
                size="big"
              />
            </Form.Field>
            <Form.Field>
              <label>Land</label>
              <input
                placeholder="Land"
                onChange={this.props.handleChange("country")}
                defaultValue={values.country}
                size="big"
              />
            </Form.Field>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Step1;
