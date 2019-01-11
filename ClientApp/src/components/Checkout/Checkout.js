import React, { Component } from "react";
import { Container, Icon, Step, List } from "semantic-ui-react";
import { connect } from "react-redux";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const zipcodeRegex = RegExp(/^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i);

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
      payment: "",
      formValid: true,
      formErrors: {
        name: "",
        street: "",
        city: "",
        country: "",
        zipcode: ""
      }
    };
  }

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  changeFormValid = value => {
    this.setState({
      formValid: value
    });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  handleChange = input => event => {
    let formErrors = { ...this.state.formErrors };
    const { name, value } = event.target;

    this.setState({ ...this.state, formValid: true });
    if (input === "payment") {
      this.setState({ [input]: event.target.textContent });
    } else {
      this.setState({ [input]: event.target.value });
    }

    switch (name) {
      case "name":
        formErrors.name =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "street":
        formErrors.street =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "city":
        formErrors.city =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "country":
        formErrors.country =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "zipcode":
        formErrors.zipcode = zipcodeRegex.test(value)
          ? ""
          : "invalid postcode, voorbeeld: 2133AA";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
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
            formErrors={this.state.formErrors}
            payment={this.state.payment}
            formValid={this.state.formValid}
            changeFormValid={this.changeFormValid}
          />
        );
      case 2:
        return (
          <Step2
            handleChange={this.handleChange}
            values={values}
            payment={this.state.payment}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            step={this.state.step}
            user={this.props.user}
          />
        );
      case 3:
        return (
          <Step3
            values={values}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            step={this.state.step}
            payment={this.state.payment}
            bezorgen={this.state.bezorgen}
          >
            {" "}
          </Step3>
        );
      case 4:
        return <h1>SUCESS</h1>;
      default:
        return;
    }
  };

  render() {
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
