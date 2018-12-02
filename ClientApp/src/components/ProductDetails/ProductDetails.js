import React, { Component } from "react";
import { Container } from "semantic-ui-react";

export class ProductDetails extends Component {
  constructor(props) 
  {
    super(props);
    this.state = {movie: {}, isLoading: true};
  }

  componentDidMount()
  {
    fetch("/api/Product/" + this.props.id)
      .then(response => response.json())
      .then(data => {
        this.setState({ ...this.state, movie: data[0], isLoading: false });
      });
  }

  renderMovie(movie)
  {
    return(      
      <Container style={{ marginTop: "7em" }}>
        <h1>Movie : {movie.title}</h1>
      </Container>
    );
  }

  render() {

    const contents = this.state.isLoading ? (<p><em>Loading...</em></p>) : (this.renderMovie(this.state.movie));

    return contents;
  }
}
