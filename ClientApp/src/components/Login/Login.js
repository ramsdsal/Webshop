import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Container,
  Segment,
  Header,
  Form,
  Message
} from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import { userActions, alertActions } from "../../Redux/actions";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      submitted: false,
      error: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { dispatch } = this.props;

    if (username && password) {
      dispatch(userActions.login(username, password));
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.alert !== prevProps.alert) {
      this.setState({
        ...this.state,
        error: this.props.alert
      });
    }
  }

  handleDismiss = () => {
    this.setState({ ...this.state, error: "" });
    this.props.dispatch(alertActions.clear());
  };

  getError = error => {
    switch (error) {
      case "Gebruiker is geblokkeerd.":
        return "U bent geblokkeerd, neem contact op met de supportservice.";
      case "Inloggegevens zijn incorrect.":
        return "Vul het juiste wachtwoord in.";
      case "U moet uw bevestigings mail besvestigen.":
        return "Check uw email.";
      default:
        return "Unknown error.";
    }
  };

  render() {
    const { loggedIn, alert } = this.props;
    const { username, password, submitted } = this.state;

    return (
      <Container style={{ marginTop: "7em" }}>
        {loggedIn ? <Redirect to={"/"} /> : ""}
        {alert.message ? (
          <Message
            color="red"
            icon="exclamation"
            onDismiss={this.handleDismiss}
            header={alert.message}
            content={this.getError(alert.message)}
          />
        ) : (
          ""
        )}
        <Header as="h2" attached="top">
          Login
        </Header>
        <Segment attached>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <Form.Input
                fluid
                icon="at"
                iconPosition="left"
                label="Email"
                placeholder="Email"
                error={submitted && !username}
                onChange={this.handleChange}
                name="username"
                value={username}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                label="Password"
                placeholder="Password"
                error={submitted && !password}
                type="password"
                onChange={this.handleChange}
                name="password"
                value={password}
              />
            </Form.Field>

            <Button type="submit">Submit</Button>
          </Form>
        </Segment>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { loggedIn } = state.authentication;
  const { alert } = state;
  return {
    loggedIn,
    alert
  };
}

const connectedLoginPage = connect(mapStateToProps)(Login);
export { connectedLoginPage as Login };
