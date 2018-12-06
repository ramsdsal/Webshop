import React, { Component } from "react";
import { Container, Label } from "semantic-ui-react";

export class ConfirmationMail extends Component {

  constructor(props) 
  {
		super(props);
		this.state = {userIsConfirmed: false, isLoading: true}
		fetch("/api/user/confirmation/" + this.props.confirmationToken).then(response => response.json()).then(data => {
			console.log(data)
			this.setState({ ...this.state, userIsConfirmed: data, isLoading: false})
		});

	}

	renderConfirmationResult()
	{
		if (this.state.userIsConfirmed) 
		{
			return(
				<Container style={{ marginTop: "7em" }}>
					Uw account is succesvol aangemaakt
				</ Container>
			);
		}

		// Confirmation of the token failed
		return(
			<Container style={{ marginTop: "7em" }}>
				Dit account is al aangemaakt of de token is verkeerd
			</ Container>
		);
	}

  render() {

		const contents = this.state.isLoading ? (
			<Container style={{ marginTop: "7em" }}>
				Loading...
			</ Container>
    ) : (
			this.renderConfirmationResult()
    );

		return contents;
  }
}
