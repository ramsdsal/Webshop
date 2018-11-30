import _ from "lodash";
import React, { Component } from "react";
import { Search, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";

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

  resultRenderer = ({ title, id }) => (
    <Link to={"counter"} key={id}>
      {" "}
      {title}{" "}
    </Link>
  );

  resetComponent = () =>
    this.setState({
      ...this.setState,
      isLoading: false,
      results: [],
      value: {}
    });

  handleResultSelect = (e, { result }) => {
    this.setState({
      ...this.state,
      value: { title: result.title, id: result.id }
    });
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ ...this.state, isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

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
    const { isLoading, value, results } = this.state;

    return (
      <Grid>
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
      </Grid>
    );
  }
}
