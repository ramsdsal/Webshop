import React, { Component } from "react";
import "./AddProduct.css";

export class AddProduct extends Component {
  render() {
    return (
      <div className="container">
        <div className="spacesection-one">
          <h3>Product toevoegen</h3>
          <div className="spacesection-two">
            <form>
              <div className="form-row" type="addproduct">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Titel"
                  />
                </div>
              </div>
              <div className="form-row" type="addproduct">
                <div className="col">
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    placeholder="Beschrijving"
                  />
                </div>
              </div>
              <div className="form-row" type="addproduct">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Releasedatum"
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Duur"
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Min. leeftijd"
                  />
                </div>
              </div>
              <div className="form-row" type="addproduct">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Afbeelding URL"
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Trailer URL"
                  />
                </div>
              </div>
              <div className="form-row" type="addproduct">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Prijs"
                  />
                </div>
                <div className="col">
                  <label className="form" type="categorien">
                    Categorie:
                  </label>
                </div>
                <div className="col-4">
                  <select className="form-control">
                    <option>Actie</option>
                    <option>Kinderfilm</option>
                    <option>Romance</option>
                    <option>Thriller</option>
                    <option>Comedy</option>
                  </select>
                </div>
                <div className="col-4">
                  <select className="form-control">
                    <option>Categorie 2 (null)</option>
                    <option>Actie</option>
                    <option>Kinderfilm</option>
                    <option>Romance</option>
                    <option>Thriller</option>
                    <option>Comedy</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Voeg product toe
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
