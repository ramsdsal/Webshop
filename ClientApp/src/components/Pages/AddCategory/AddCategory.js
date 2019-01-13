import React, { Component } from "react";
import { Container, Form, Message, TextArea, Segment, Header, Icon } from "semantic-ui-react";
import "./AddCategory.css";
import { relativeTimeThreshold } from "moment";

export class AddCategory extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      categoryName: "",
      categoryDescription: "",

      addCategoryError : false,
      serverCateoryResponse : "",
      categoryFormIsLoading : false
    }
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

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  render() {
    const contents = this.renderPage();

    return contents;
  }
}
