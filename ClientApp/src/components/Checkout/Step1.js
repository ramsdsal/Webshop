import React, { Component } from "react";
import {
  Form,
  Grid,
  Button,
  Icon,
  Checkbox,
  Segment,
  Message
} from "semantic-ui-react";
import "./Checkout.css";

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out

  Object.values(rest.values).forEach(val => {
    val === "" && (valid = false);
  });

  return valid;
};

class Step1 extends Component {
  handleSubmit = e => {
    e.preventDefault();

    if (this.props.bezorgen === "klantadres") {
      this.props.nextStep();
    } else {
      if (formValid(this.props)) {
        this.props.nextStep();
      } else {
        this.props.changeFormValid(false);
      }
    }
  };

  render() {
    const { values } = this.props;
    return (
      <Segment.Group size="big">
        <Segment>Bezorgadres</Segment>
        <Grid textAlign="center">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form color="green" size="huge" onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Field>
                  <Checkbox
                    radio
                    label="Bezorgen op het klantadres"
                    name="checkboxRadioGroup"
                    value="klantadres"
                    checked={this.props.bezorgen === "klantadres"}
                    onChange={this.props.handleCheckboxChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox
                    radio
                    label="Selecteer ander bezorgadres"
                    name="checkboxRadioGroup"
                    value="bezorgadres"
                    checked={this.props.bezorgen === "bezorgadres"}
                    onChange={this.props.handleCheckboxChange}
                  />
                </Form.Field>
              </Form.Group>
              {!this.props.formValid ? (
                <Message negative>
                  <Message.Header>Ongeldige formulier</Message.Header>
                  <p>Vul de verplichte velden in</p>
                </Message>
              ) : (
                ""
              )}

              {this.props.bezorgen === "bezorgadres" ? (
                <Segment>
                  <Form.Field error={this.props.formErrors.name.length > 0}>
                    <label>Naam</label>
                    <input
                      placeholder="Naam"
                      onChange={this.props.handleChange("name")}
                      defaultValue={values.name}
                      size="big"
                      name="name"
                    />
                    {this.props.formErrors.name.length > 0 ? (
                      <span className="errorMessage">
                        {this.props.formErrors.name}
                      </span>
                    ) : (
                      ""
                    )}
                  </Form.Field>
                  <Form.Field error={this.props.formErrors.street.length > 0}>
                    <label>Straat</label>
                    <input
                      placeholder="Piersonstraat 10"
                      onChange={this.props.handleChange("street")}
                      defaultValue={values.street}
                      size="big"
                      name="street"
                    />
                    {this.props.formErrors.street.length > 0 ? (
                      <span className="errorMessage">
                        {this.props.formErrors.street}
                      </span>
                    ) : (
                      ""
                    )}
                  </Form.Field>
                  <Form.Field error={this.props.formErrors.zipcode.length > 0}>
                    <label>Postcode</label>
                    <input
                      placeholder="3244PC"
                      onChange={this.props.handleChange("zipcode")}
                      defaultValue={values.zipcode}
                      size="big"
                      name="zipcode"
                    />
                    {this.props.formErrors.zipcode.length > 0 ? (
                      <span className="errorMessage">
                        {this.props.formErrors.zipcode}
                      </span>
                    ) : (
                      ""
                    )}
                  </Form.Field>
                  <Form.Field error={this.props.formErrors.city.length > 0}>
                    <label>Woonplaats</label>
                    <input
                      placeholder="Rotterdam"
                      onChange={this.props.handleChange("city")}
                      defaultValue={values.city}
                      size="big"
                      name="city"
                    />
                    {this.props.formErrors.city.length > 0 ? (
                      <span className="errorMessage">
                        {this.props.formErrors.city}
                      </span>
                    ) : (
                      ""
                    )}
                  </Form.Field>
                  <Form.Field error={this.props.formErrors.country.length > 0}>
                    <label>Land</label>
                    <input
                      placeholder="Nederland"
                      onChange={this.props.handleChange("country")}
                      defaultValue={values.country}
                      size="big"
                      name="country"
                    />
                    {this.props.formErrors.country.length > 0 ? (
                      <span className="errorMessage">
                        {this.props.formErrors.country}
                      </span>
                    ) : (
                      ""
                    )}
                  </Form.Field>
                </Segment>
              ) : (
                ""
              )}
              <Button
                style={{ marginTop: "5em" }}
                icon
                labelPosition="right"
                type="submit"
                size="big"
              >
                Verder
                <Icon name="right arrow" />
              </Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment.Group>
    );
  }
}

export default Step1;
