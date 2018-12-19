import React, { Component } from "react";
import { Container, Form, Message,TextArea, Segment, Header, Table, Icon } from "semantic-ui-react";
import "./UpdateProduct.css";

export class UpdateProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      prices: {},

      //Product
      title: "",
      releaseDate: "",
      runTime: "",
	  description: "",
	  poster: "",
	  ageRating: "",
	  trailerUrl: "",
	  quantity: "",

      //Price
	  value: "",
	  priceBeginDate: "",
	  priceEndDate: "",

      //Form validation and server response, Update product
      updateProductError: false,
      productUpdated: false,
      serverUpdateProductResponse: "",
      productFormIsLoading: false,

      //Form validation and server response, Add price
      addPriceError: false,
      priceAdded: false,
      serverPriceResponse: "",
      priceFormIsLoading: false
    };
  }

  componentDidMount() {
    fetch("/api/product/getUpdateProduct/" + this.props.productId)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const product = data[0];
        this.setState({
          ...this.state,
          isLoading: false,
          prices: product.prices,
		  title: product.title,
		  releaseDate: product.released,
		  runTime: product.runTime,
		  description: product.description,
		  poster: product.poster,
		  ageRating: product.ageRating,
		  trailerUrl: product.trailerUrl,
		  quantity: product.quantity,
        });
      });
  }

  renderPage() {
	  
    var today = new Date();
    var monthToday = today.getUTCMonth() + 1;
    if (monthToday < 10) {
      monthToday = "0" + monthToday;
    }
    var dayToday = today.getDate();
    if (dayToday < 10) {
      dayToday = "0" + dayToday;
    }

    var currentDate = today.getFullYear() + '-' + (monthToday) + '-' + dayToday;

    return (
      <Container style={{ marginTop: "7em" }}>
        <Header as="h2" attached="top">
          Product aanpassen
        </Header>
        <Segment inverted>
		<Form 
		  size="big"  
		  inverted
          onSubmit={this.updateProduct}
          loading = {this.state.productFormIsLoading}
          error={this.state.updateProductError}
          success={this.state.productUpdated}
        >
        {
            this.state.updateProductError ? <Message size='large' error 
            header="Product kon niet geupdate worden" 
            content={this.state.serverUpdateProductResponse}/>
            :
            null
        }
        {
            this.state.productUpdated ? <Message size='large' success 
            header="Product succesvol aangepast" 
            content={this.state.serverUpdateProductResponse}/>
            : 
            null
        }
          <Form.Group unstackable widths={2}>
            <Form.Input
              required 
              label="Titel"
              placeholder="Titel"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <Form.Input
			  required
			  type="date"
              label="Publicatiedatum"
              placeholder="Publicatiedatum"
			  name="releaseDate"
			  max= "2200-07-06"
              min= "1000-07-27"
              // value= {"1800-07-06"} //"2011-09-29"
              value={this.state.releaseDate}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group unstackable widths={2}>
            <Form.Input
              required
              label="Speelduur"
              placeholder="Speelduur"
              name="runTime"
              type="number"
              value={this.state.runTime}
              onChange={this.handleChange}
            />
			<Form.Input 
			  required 
			  type="number"
			  label='Leeftijdsclassificatie' 
			  placeholder="Leeftijdsclassificatie"
			  name="ageRating"
			  min="0"
              value= {this.state.ageRating}
              onChange={this.handleChange} 
            />
			<Form.Input 
			  required 
			  type="number"
			  label='Kwantiteit' 
			  placeholder="Kwantiteit"
			  name="quantity"
			  min="0"
              value= {this.state.quantity}
              onChange={this.handleChange} 
            />
			</Form.Group>
			<Form.Field 				
				required 
				type="text"
				label='Beschrijving' 
				placeholder="Beschrijving"
				name="description"
				value= {this.state.description}
				onChange={this.handleChange}  
				control={TextArea}
			/>
			<Form.Group unstackable widths={"equal"}>
				<Form.Input 
					required 
					label='Afbeelding URL' 
					placeholder="Afbeelding URL"
					name="poster"
					value= {this.state.poster}
					onChange={this.handleChange} 
					/>
					<Form.Input 
					required 
					label='Trailer Code' 
					placeholder="Trailer Code"
					name="trailerUrl"
					value= {this.state.trailerUrl}
					onChange={this.handleChange} 
				/>
          	</Form.Group>
          <Form.Button
            color='blue'
            type='submit'
            disabled={
              !this.state.title
              || !this.state.releaseDate
              || !this.state.runTime
			  || !this.state.description
			  || !this.state.poster
			  || !this.state.ageRating
			  || !this.state.trailerUrl
			  || !this.state.quantity
            }
          >
            <Icon name="write" /> Aanpassen
          </Form.Button>
        </Form>
        </ Segment>
        <br />
        <br />
        <br />
        <Header as="h2" attached="top">
          Prijs toevoegen
        </Header>
        <Segment inverted>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Euro</Table.HeaderCell>
              <Table.HeaderCell>Begin datum</Table.HeaderCell>
              <Table.HeaderCell>Eind datum</Table.HeaderCell>
              <Table.HeaderCell width={1}>Huidig</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.prices.map((price, index) => {
              return (
                <Table.Row key= {index}
                  positive={index === this.state.prices.length - 1}
                >
                  <Table.Cell>{price.value}</Table.Cell>
                  <Table.Cell>{price.dateOn}</Table.Cell>
                  <Table.Cell>{price.dateOff}</Table.Cell>
                  <Table.Cell>
                    {index === this.state.prices.length - 1 ? (
                      <Icon color="green" name="checkmark" size="large" />
                    ) : (
                      ""
                    )}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
		<Form 
	      size="big"  
		  inverted
          onSubmit={this.addPrice}
          loading = {this.state.priceFormIsLoading}
          error={this.state.addPriceError}
          success={this.state.priceAdded}
        >
        {
            this.state.addPriceError ? <Message size='large' error 
            header="Prijs kon niet toegevoegd worden." 
            content={this.state.serverPriceResponse}/>
            :
            null
        }
        {
            this.state.priceAdded ? <Message size='large' success 
            header="Prijs succesvol toegevoegd" 
            content={this.state.serverPriceResponse}/>
            : 
            null
        }
          <Form.Group unstackable widths={2}>
            <Form.Input
              required
              label="Euro"
              placeholder="10.00"
			  name="value"
			  type="number"
			  min="0"
              onChange={this.handleChange}
            />
            <Form.Input
			  required
			  type="date"
              label="Begin Datum"
              placeholder="Begin Datum"
			  name="priceBeginDate"
			  max= "9999-07-06"
              min= {currentDate}
              value={this.state.priceBeginDate}
              onChange={this.handleChange}
            />
			<Form.Input
			  required
			  type="date"
              label="Eind Datum"
              placeholder="Eind Datum"
			  name="priceEndDate"
			  max= "9999-07-06"
              min= {currentDate}
              value={this.state.priceEndDate}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Button
            color='blue'
            type='submit'
            disabled={
              !this.state.value
			  || !this.state.priceBeginDate
			  || !this.state.priceEndDate
            }
          >
            <Icon name="plus" /> Toevoegen
          </Form.Button>
        </Form>
        </ Segment>
      </Container>
    );
  }

  addPrice = () => {
    this.setState({...this.state, priceFormIsLoading: true})

    var jsonToSend = {
		value: this.state.value,
		dateOn: this.state.priceBeginDate,
		dateOff: this.state.priceEndDate,
		"Product":{
			id: this.props.productId,
		},
		Current: 1
    };
    
    fetch("/api/price/AddPrice", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jsonToSend)
    })
    .then(response => response.json())
    .then(data => {
      
      var newPrice = {
		value: this.state.value,
		dateOn: this.state.priceBeginDate,
		dateOff: this.state.priceEndDate
	};
        
      var pricesInState = this.state.prices;
      pricesInState.push(newPrice);
      
      this.setState({...this.state, serverPriceResponse: data.response, addPriceError: data.isError, priceAdded: data.priceAdded, priceFormIsLoading: false})
    });
  };

  updateProduct = () => {
	this.setState({...this.state, productFormIsLoading: true})
	
    var jsonToSend = {
	  id: this.props.productId,
	  title: this.state.title,
      released: this.state.releaseDate,
      runTime: this.state.runTime,
	  description: this.state.description,
	  poster: this.state.poster,
	  ageRating: this.state.ageRating,
	  trailerUrl: this.state.trailerUrl,
	  quantity: this.state.quantity,
    };

    fetch("/api/product/updateProduct", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jsonToSend)
    })
    .then(response => response.json())
    .then(data => {
      this.setState({...this.state, serverUpdateProductResponse: data.response, updateProductError: data.isError, productUpdated: data.productUpdated, productFormIsLoading: false})
    });
  };

  handleChange = (e, { name, value }) =>
    this.setState({ [name]: value });

  render() {
    const contents = this.state.isLoading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderPage()
    );

    return contents;
  }
}
