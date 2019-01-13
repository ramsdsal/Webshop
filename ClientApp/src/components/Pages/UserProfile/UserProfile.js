import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Grid,
	Header,
	Menu,
	Segment,
} from "semantic-ui-react";
import { OrderHistory } from "../OrderHistory/OrderHistory";
import { UserDetails } from "../UserDetails/UserDetails";
import { Password } from "../Password/Password";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
			userId: "",
			userPropsLoaded: false,
			currentPage: "Gegevens"
    };
  }

  componentWillReceiveProps(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.setState({
				...this.state,
				userPropsLoaded: true,
				userId: this.props.user.id,
				currentPage: prevProps.currentPage
			});
			this.goToPage(this.state.currentPage)
    }
	}

	componentDidMount()
	{
		if (this.state.userPropsLoaded == false) {
			console.log("didmount: " + this.state.userId + "userPropsLoaded: " + this.state.userPropsLoaded)
			this.setState({
				...this.state,
				userPropsLoaded: true,
				userId: this.props.user.id,
				currentPage: "Gegevens"
			});	
			this.goToPage(this.state.currentPage)
		}
	}

	renderPage()
	{
		if (this.state.userPropsLoaded) 
		{
			switch (this.state.currentPage) {
				case "Gegevens":
					return (
						<UserDetails userId={this.state.userId} />
					);
				case "Wachtwoord":
					return (
						<Password userId={this.state.userId} />
					);
				case "Bestellingen":
					return (
						<OrderHistory userId={this.state.userId} />
					);
					
				default:
					return;
				}	
		}
	}
	
	goToPage = (pageToGoTo) =>
	{
		this.setState({currentPage: pageToGoTo})
	}

  render() {
    return (
			<Container style={{ marginTop: "7em" }}>
			<Grid>
				<Grid.Column width={4}>
					<Header as="h2" attached="top">
						Instellingen
					</Header>
					<Menu fluid vertical>
						<Segment attached>
							<Menu.Item
								onClick={this.goToPage.bind(this, "Gegevens")}
								name="Gegevens"
							/>
							<Menu.Item
								onClick={this.goToPage.bind(this, "Wachtwoord")}
								name="Wachtwoord wijzigen"
							/>
							<Menu.Item
								onClick={this.goToPage.bind(this, "Bestellingen")}
								name="Bestellingen"
							/>
						</Segment>
					</Menu>
				</Grid.Column>
				<Grid.Column stretched width={12}>
				{
					this.renderPage()
				}
				</Grid.Column>
			</Grid>
		</Container>
		);
  }
}

const mapStateToProps = state => {
  return { user: state.authentication.user };
};
export default connect(mapStateToProps)(UserProfile);
