import React, { Component } from "react";
import { Container, Icon, Step, List, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import Step1 from "./Step1";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      name: "",
      street: "",
      city: "",
      country: "",
      zipcode: ""
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
    this.setState({ [input]: event.target.value });
  };

  getPage = values => {
    switch (this.state.step) {
      case 1:
        return <Step1 handleChange={this.handleChange} values={values} />;
      case 2:
        return <h1>BETALING</h1>;
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
    const { name, street, zipcode, city, country } = this.state;
    const values = { name, street, zipcode, city, country };

    return (
      <Container style={{ marginTop: "7em" }} textAlign="center">
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
          <List.Item>
            <Button
              icon
              labelPosition="right"
              onClick={this.prevStep}
              disabled={step <= 1 ? true : false}
            >
              Terug
              <Icon name="left arrow" />
            </Button>
            <Button
              icon
              labelPosition="right"
              onClick={this.nextStep}
              disabled={step > 2 ? true : false}
            >
              Verder
              <Icon name="right arrow" />
            </Button>
          </List.Item>
        </List>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.authentication.user };
};

export default connect(mapStateToProps)(Checkout);
