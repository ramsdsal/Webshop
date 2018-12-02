import _ from "lodash";
import React, { Component } from "react";
import { Search, Grid, Label } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

export class SearchMovie extends Component {
  componentWillMount() {
    this.resetComponent();
    fetch("/api/Product/search", {
      method: "get",
      headers: { "content-type": "application/json" }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          ...this.state,
          source: data
        });
      });
  }

  resultRenderer = ({ title }) => <Label>{title}</Label>;

  resetComponent = () =>
    this.setState({
      ...this.setState,
      isLoading: false,
      results: [],
      value: {},
      redirect: false
    });

  handleResultSelect = (e, { result }) => {
    this.setState({
      ...this.state,
      value: { title: result.title, id: result.id },
      redirect: true
    });

    setTimeout(() => {
      return this.resetComponent();
    }, 200);
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ ...this.state, isLoading: true, value });
    setTimeout(() => {
      if (this.state.value.title < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.title);

      this.setState({
        ...this.state,
        isLoading: false,
        results: _.filter(this.state.source, isMatch)
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results, redirect } = this.state;
    const path = "/productdetails/" + value.id;
    return (
      <div>
        <Grid>
          {redirect ? <Redirect to={path} /> : ""}
          <Grid.Column width={6}>
            <Search
              loading={isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={_.debounce(this.handleSearchChange, 500, {
                leading: true
              })}
              results={results}
              value={value.title}
              noResultsMessage="Geen resultaat gevonden"
              resultRenderer={this.resultRenderer}
              {...this.props}
            />
          </Grid.Column>
          {/* <Grid.Column width={10}>
          <Segment>
            <Header>State</Header>
            <pre style={{ overflowX: "auto" }}>
              {JSON.stringify(this.state, null, 2)}
            </pre>
            <Header>Options</Header>
            <pre style={{ overflowX: "auto" }}>
              {JSON.stringify(source, null, 2)}
            </pre>
          </Segment>
        </Grid.Column> */}
        </Grid>
      </div>
    );
  }
}
