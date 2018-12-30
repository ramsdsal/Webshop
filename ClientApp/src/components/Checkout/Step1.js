import React, { Component } from "react";
import { Form, Grid, Button, Icon, Checkbox, Segment } from "semantic-ui-react";

class Step1 extends Component {
  saveAndContinue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values } = this.props;
    return (
      <Segment.Group size="big">
        <Segment>Bezorgadres</Segment>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form color="green" size="huge">
              <Form.Group>
                <Form.Field>
                  <Checkbox
                    radio
                    label="Bezorgen op het klantadres"
                    name="checkboxRadioGroup"
                    value="klantadres"
                    checked={values.bezorgen === "klantadres"}
                    onChange={this.props.handleCheckboxChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox
                    radio
                    label="Selecteer ander bezorgadres"
                    name="checkboxRadioGroup"
                    value="bezorgadres"
                    checked={values.bezorgen === "bezorgadres"}
                    onChange={this.props.handleCheckboxChange}
                  />
                </Form.Field>
              </Form.Group>
              {values.bezorgen === "bezorgadres" ? (
                <Segment>
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
                      placeholder="Piersonstraat 10"
                      onChange={this.props.handleChange("street")}
                      defaultValue={values.street}
                      size="big"
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Postcode</label>
                    <input
                      placeholder="3244PC"
                      onChange={this.props.handleChange("zipcode")}
                      defaultValue={values.zipcode}
                      size="big"
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Woonplaats</label>
                    <input
                      placeholder="Rotterdam"
                      onChange={this.props.handleChange("city")}
                      defaultValue={values.city}
                      size="big"
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Land</label>
                    <input
                      placeholder="Nederlands"
                      onChange={this.props.handleChange("country")}
                      defaultValue={values.country}
                      size="big"
                    />
                  </Form.Field>
                </Segment>
              ) : (
                ""
              )}
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
      </Segment.Group>
    );
  }
}

export default Step1;
