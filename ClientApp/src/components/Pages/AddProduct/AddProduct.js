import React, { Component } from "react";
import { Container, Form, Message, TextArea, Segment, Header, Table, Icon } from "semantic-ui-react";
import "./AddProduct.css";

export class AddProduct extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      categoryDropdown : [ ],
      // Product
      title: "",
      description: "",
      releaseDate: "",
      runTime: "",
      poster: "",
      ageRating: "",
      trailerUrl: "",
      quantity: "",
      
      //Price
      priceValue: 0,
      priceBeginDate: "",
      
      // Categorie
      categoryName: "",
      categoryDescription: "",
      
      //ProductCategorie
      categoryId : "",
      productId : "",
      
      //Product validatie
      addProductError : false,
      productAdded : false,
      serverAddedProductResponse : "",
      productFormIsLoading : false,
      
      //Catogorie validatie
      addCategoryError : false,
      categoryAdded : false,
      serverCateoryResponse : "",
      categoryFormIsLoading: false
      
    };
    fetch("api/Category/GetCategories")
    .then(response => response.json())
    .then(data => {this.setState({
      ...this.state,
      categoryDropdown : data
    })})
  }
  
  sendAddedProduct = () => { 
    
    var jsonToSend = {
      Title : this.state.title,
      Description : this.state.description,
      Released : this.state.releaseDate,
      RunTime : this.state.runTime,
      Poster : this.state.poster, 
      AgeRating : this.state.ageRating,
      TrailerUrl : this.state.trailerUrl, 
      Quantity : this.state.quantity,
      Prices : [
        { Value : this.state.priceValue,
          Current : 1,
          DateOn : new Date() }]
        }
        
        fetch ("api/product/addproduct", {
          method : "Post",
          headers : {
            Accept : "application/json",
            "Content-Type" : "application/json"
          },
      body : JSON.stringify(jsonToSend)
    }).then(response => response.json())
    .then(data => {
      console.log(data)
      this.setState({
        ...this.state,
        productId : data.productId,
        serverAddedProductResponse : data.response,
        addProductError : data.isError,
        productAdded : data.productAdd,
        productFormIsLoading : false
      });
      console.log(this.state)
      if (this.state.productId > 0)
      {
        var addingPC = { ProductId : this.state.productId, CategoryId : this.state.categoryId }
        console.log(addingPC)
        this.sendProductCategory(addingPC)
        this.setState({
          ...this.state,
          title : "",
          description : "",
          releaseDate : "",
          runTime : "",
          poster : "",
          ageRating : "",
          trailerUrl : "",
          quantity : ""
        })
      }    
    });
    
  }
  
  sendProductCategory = (procat) => {
    console.log(procat)
    fetch ("api/Category/addproductcategory", {
      method : "Post",
      headers : {
        Accept : "application/json",
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(procat)
    })

  }

  sendAddedCategory = () => {

    var jsonToSend = {
      Name : this.state.categoryName,
      Description : this.state.categoryDescription
    }

    fetch ("api/category/addcategory", {
      method : "Post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jsonToSend)
    })
      .then(response => response.json())
      .then(data => { this.setState({
        ...this.state,
        serverCateoryResponse : data.response,
        addCategoryError : data.isError,
        categoryAdded : data.categoryAdded,
        categoryFormIsLoading : false
      })
      if(this.state.categoryAdded) 
      {
        console.log(this.state)
        this.setState({
          ...this.state,
          Name : "",
          Description : ""
        })
      }
    })
  };

  renderPage() {
    return (
      <Container style={{ marginTop : "7em"}}>
        <Header as="h2" attached="top">
          Product Toevoegen
        </Header>
        <Segment>
          <Form 
            size="big"
            onSubmit={this.sendAddedProduct}
            loading={this.state.productFormIsLoading}
            error={this.state.addProductError}
            succes={this.state.productAdded}
          >
          {this.state.addProductError ? (
            <Message
              size="large"
              error
              header="Product bestaat al"
              content={this.state.serverAddedProductResponse}/>
          ) : null}

          {this.state.productAdded ? (
            <Message
              size="large"
              succes
              header="Product toegevoegd"
              content={this.state.serverAddedProductResponse}/>
          ) : null}
            <Form.Group unstackable widths={2}>
              <Form.Input
                required
                label="Titel"
                placeholder="Titel"
                name="title"
                onChange={this.handleChange}
              />
              <Form.Input
                required
                type="date"
                label="Publicatiedatum"
                placeholder="Publicatiedatum"
                name="releaseDate"
                max="2200-07-06"
                min="1000-07-27"
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
                onChange={this.handleChange}
              />
              <Form.Input
                required
                type="number"
                label="Leeftijdsclassificatie"
                placeholder="Leeftijdsclassificatie"
                name="ageRating"
                min="0"
                onChange={this.handleChange}
              />
              <Form.Input
                required
                type="number"
                label="Kwantiteit"
                placeholder="Kwantiteit"
                name="quantity"
                min="0"
                onChange={this.handleChange}
              />
              <Form.Input
                required
                type="number"
                label="Prijs"
                placeholder="10.00"
                name="priceValue"
                min="0.01"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Field
              required
              type="text"
              label="Beschrijving"
              placeholder="Beschrijving"
              name="description"
              control={TextArea}
              onChange={this.handleChange}
            />
            <Form.Group unstackable widths={"equal"}>
              <Form.Input
                required
                label="Afbeelding URL"
                placeholder="Afbeelding URL"
                name="poster"
                onChange={this.handleChange}
              />
              <Form.Input
                required
                label="Trailer Code"
                placeholder="Traier Code"
                name="trailerUrl"
                onChange={this.handleChange}
              />
              <Form.Dropdown
                required
                label="Categorie"
                placeholder="Categorie"
                name="categoryId"
                fluid selection
                options={this.state.categoryDropdown}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Button
              color="blue"
              type="submit"
              >
              <Icon name="write" /> Toevoegen
              </Form.Button>
          </Form>
        </Segment>
        <Header as="h2" attached="top">
          Catogoriëen Toevoegen
        </Header>
        <Segment>
          <Form 
            size='big'
            onSubmit={this.sendAddedCategory}
            loading={this.state.categoryFormIsLoading}
            error={this.state.addCategoryError}
            succes={this.state.categoryAdded}
          >
            {this.state.addCategoryError ? (
              <Message 
                size="large"
                error
                header="Categorie bestaat al"
                content={this.state.serverCateoryResponse}/>
            ) : null}
            {this.state.categoryAdded ? (
              <Message 
                size="large"
                succes
                header="Categorie toegevoegd"
                content={this.state.serverCateoryResponse}
              />
            ) : null}
            <Form.Input
              required
              label="Categorie"
              placeholder="Categorie"
              name="categoryName"
              onChange={this.handleChange}
          />
            <Form.Field
              type="text"
              label="Beschrijving"
              placeholder="Beschrijf je categorie"
              name="categoryDescription"
              onChange={this.handleChange}
              control={TextArea}
            />
            <Form.Button
              color="blue"
              type="submit"
              disables={!this.state.categoryName}>              
              <Icon name="write"/> Toevoegen
            </Form.Button>
          </Form>
        
        </Segment>
      </Container>
    )
  }

  // sendAddedProduct = () => {
  //   var jsonToSend = {
  //     Product: {
  //       Title: this.state.Title,
  //       Description: this.state.Description,
  //       Released: this.state.Released,
  //       RunTime: this.state.RunTime,
  //       Poster: this.state.Poster,
  //       AgeRating: this.state.AgeRating,
  //       TrailerURL: this.state.TrailerURL,
  //       Quantity: this.state.Quantity
  //     }
  //   };
  //   // const rawResponse = fetch("/api/product/addproduct", {
  //   //   method: "POST",
  //   //   headers: {
  //   //     Accept: "application/json",
  //   //     "Content-Type": "application/json"
  //   //   },
  //   //   body: JSON.stringify(jsonToSend)
  //   // });
  // };

  handleChange = (e, { name, value }) => this.setState({ [name]: value }, console.log(this.state));

  render() {
    const contents = this.renderPage();

    return contents;
  }
}
