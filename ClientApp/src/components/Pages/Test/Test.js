import React, { Component } from "react";
import { connect } from "react-redux";


export class Test extends Component {

	constructor(props) 
	{
		super(props);
		this.state = {
			testValue :10
		}
	}

	componentDidUpdate()
	{
		console.log(this.props)
	}

	componentDidMount()
	{
		this.setState({testValue: 11})
	}

  render() {
    return (
		<div>{this.state.testValue}}</div>
    );
  }
}
const mapStateToProps = state => {
	return { user: state.authentication.user };
  };
export default connect(mapStateToProps)(Test);