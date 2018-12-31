import React, { Component } from "react";
import { Container, Icon, Step, List } from "semantic-ui-react";
import { connect } from "react-redux";
import Step1 from "./Step1";
import Step2 from "./Step2";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      bezorgen: "klantadres",
      name: "",
      street: "",
      city: "",
      country: "",
      zipcode: "",
      payment: ""
    };
  }

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  handleChange = input => event => {
    if (input === "payment") {
      this.setState({ [input]: event.target.textContent });
    } else {
      this.setState({ [input]: event.target.value });
    }
  };

  handleCheckboxChange = (e, { value }) => this.setState({ bezorgen: value });

  getPage = values => {
    switch (this.state.step) {
      case 1:
        return (
          <Step1
            handleChange={this.handleChange}
            values={values}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            step={this.state.step}
            handleCheckboxChange={this.handleCheckboxChange}
            bezorgen={this.state.bezorgen}
          />
        );
      case 2:
        return (
          <Step2
            handleChange={this.handleChange}
            payment={this.state.payment}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            step={this.state.step}
          />
        );
      case 3:
        return <h1>OVERZICHT</h1>;
      case 4:
        return <h1>SUCESS</h1>;
      default:
        return;
    }
  };

  render() {
    console.log(this.state);
    const { step } = this.state;
    const {
      name,
      street,
      zipcode,
      city,
      country,
      bezorgen,
      payment
    } = this.state;
    const values = { name, street, zipcode, city, country, bezorgen, payment };

    return (
      <Container style={{ marginTop: "7em" }}>
        <Step.Group size="massive">
          <Step
            disabled={step !== 1 ? true : false}
            active={step === 1 ? true : false}
          >
            <Icon name="truck" />
            <Step.Content>
              <Step.Title>Bezorgen</Step.Title>
              <Step.Description>Kies je bezorgadres.</Step.Description>
            </Step.Content>
          </Step>
          <Step
            disabled={step !== 2 ? true : false}
            active={step === 2 ? true : false}
          >
            <Icon name="payment" />
            <Step.Content>
              <Step.Title>Betaalmethode</Step.Title>
              <Step.Description>Kies je betaal methode.</Step.Description>
            </Step.Content>
          </Step>

          <Step
            disabled={step !== 3 ? true : false}
            active={step === 3 ? true : false}
          >
            <Icon name="info" />
            <Step.Content>
              <Step.Title>Overzicht</Step.Title>
            </Step.Content>
          </Step>
        </Step.Group>

        <List>
          <List.Item>{this.getPage(values)}</List.Item>
          <List.Item />
        </List>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.authentication.user };
};

export default connect(mapStateToProps)(Checkout);
