import React, { Component } from "react";
import { Container, Form } from "semantic-ui-react";
import "./AddProduct.css";

export class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Title : "",
      Description : "",
      Released : "",
      RunTime : "",
      Poster : "",
      AgeRating : "",
      TrailerURL : "",
      Quantity : "",
      Category : "",

      CategoryName : "",
      CategoryDescription : ""
    };
  }

  sendAddedProduct = () => {
    var jsonToSend = {
      "Product" : {
        Title : this.state.Title,
        Description : this.state.Description,
        Released : this.state.Released,
        RunTime : this.state.RunTime,
        Poster : this.state.Poster,
        AgeRating : this.state.AgeRating,
        TrailerURL : this.state.TrailerURL,
        Quantity : this.state.Quantity        
      },
    };
    const rawResponse = fetch("/api/product/addproduct", {
      method: "POST",
      headers : {
        Accept : "application/json",
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(jsonToSend)
    });
  }
  
  sendAddedCategory = () => {
    var jsonToSend = {
      "Category" : {
        Name : this.state.CategoryName
      },
    };
    const rawResponse = fetch("/api/category/addcategory", {
      method : "POST",
      headers : {
        Accept : "application/json",
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(jsonToSend)
    });
  }

  handleChange = (e, { CategoryName, value }) => this.setState({ [CategoryName] : value}, console.log(this.state))


  render() {
    return (
      // <div className="container">
      // <div className="spacesection-one">
      //   <h3>Product toevoegen</h3>
      //   <div className="spacesection-two" >
      //   <form>
      //     <div className="form-row" type="addproduct"> 
      //     <div className="col">
      //       <input type="text" className="form-control" placeholder="Titel"/>
      //     </div>
      //     </div>
      //     <div className="form-row" type="addproduct">
      //     <div className="col">
      //     <textarea className="form-control" id="exampleFormControlTextarea1" placeholder="Beschrijving"></textarea>
      //     </div>
      //     </div>
      //     <div className="form-row" type="addproduct">
      //     <div className="col">
      //       <input type="text" className="form-control" placeholder="Releasedatum"/>
      //     </div>
      //     <div className="col">
      //       <input type="text" className="form-control" placeholder="Duur"/>
      //     </div>
      //     <div className="col">
      //       <input type="text" className="form-control" placeholder="Min. leeftijd"/>
      //     </div>
      //     </div>
      //     <div className="form-row" type="addproduct">
      //     <div className="col">
      //       <input type="text" className="form-control" placeholder="Afbeelding URL"/>
      //     </div>
      //     <div className="col">
      //       <input type="text" className="form-control" placeholder="Trailer URL"/>
      //     </div>
      //     </div>
      //     <div className="form-row" type="addproduct">
      //         <div className="col">
      //           <input type="text" className="form-control" placeholder="Prijs"/>
      //         </div>
      //         <div className="col">    
      //         <label className="form" type="categorien">Categorie:</label>          
      //         </div>
      //         <div className="col-4">
      //           <select className="form-control" >
      //             <option>Actie</option>
      //             <option>Kinderfilm</option>
      //             <option>Romance</option>
      //             <option>Thriller</option>
      //             <option>Comedy</option>
      //           </select>
      //         </div>
      //         <div className="col-4">
      //           <select className="form-control" >
      //           <option>Categorie 2 (null)</option>
      //             <option>Actie</option>
      //             <option>Kinderfilm</option>
      //             <option>Romance</option>
      //             <option>Thriller</option>
      //             <option>Comedy</option>
      //           </select>
      //         </div>
      //     </div>
      //     <button type="submit" className="btn btn-primary">Voeg product toe</button>
      // </form>
      // </div>
      // </div>
      // </div>
      <Container style={{ marginTop : "7em"}}>
        <Form onSubmit={this.sendAddedCategory} id="addingCat">
        <Form.Group>
          <Form.Input
            label="categoryName *"
            placeholder="Category"
            name="categoryName"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Button type="Submit" content='Submit'/>
          </Form>
      </Container>

    );
  }
}
