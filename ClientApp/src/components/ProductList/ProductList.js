import * as React from "react";
import { Link } from "react-router-dom";
import ProductListItem from "../ProductListItem";
import "./ProductList.css";
import { Container, Grid } from "semantic-ui-react";

export default class ProductList extends React.Component
{
  constructor() 
  {
	super();
	
	this.state = {movies: [], isLoading: true}
  }

  componentDidMount()
  {
    fetch("/api/Product/", {
		method: "get",
		credentials: "include",
		headers: { "content-type": "application/json" }
	  })
		.then(response => response.json())
		.then(data => {
		  this.setState({ ...this.state, movies: data, isLoading: false });
		});
  }

  render() 
  {
	const contents = this.state.isLoading ? (
		<p>
		  <em>Loading...</em>
		</p>
	  ) : (
		this.renderMovies(this.state.movies)
	  );
	  
    return contents;
  }

   renderMovies(movies)
   {
		return (
			<Container style={{ marginTop: "7em" }}>
      <Grid columns={4} stackable>

				{movies.map(movie => {
					return <ProductListItem movieToShow={movie} key={movie.id} />;
				})}
				
      </Grid>
    </Container>
    );
  }
}
