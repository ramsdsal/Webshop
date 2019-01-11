import React, { Component } from "react";
import "./Checkout.css";
import { Message, Icon } from "semantic-ui-react";

class Step3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {},
      isLoading: true
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.result !== prevProps.result) {
      this.setState({
        ...this.state,
        result: this.props.result,
        isLoading: false
      });
    }
  }

  render() {
    const { isLoading, result } = this.state;
    console.log(result);
    return (
      <div>
        <Message icon color={isLoading ? "grey" : "green"}>
          <Icon
            name={isLoading ? "circle notched" : "check circle outline"}
            loading={isLoading}
          />
          <Message.Content>
            <Message.Header>
              {isLoading
                ? "Betalingverzoek wordt verzenden"
                : "Betaling is met sucess betaald"}
            </Message.Header>
            {isLoading
              ? "Wacht op je bank goedkeuring"
              : "Bedankt voor uw aankoop"}
          </Message.Content>
        </Message>
        <div className="purchase overflow-auto">
          <header>
            <div className="row">
              <div className="col-sm-3 col-xs-3" />
              <div className="col-sm-9 col-xs-9 company-details">
                <div>
                  <br />
                </div>
              </div>
            </div>
          </header>
          <main>
            <div className="row">
              <div className="col-sm-3 col-xs-3 to-details">
                <div>PURCHASED ORDER FOR :</div>
                <div className="to-name">Media Mania</div>
                <div className="to-address">Company A Address</div>
                <div className="to-city">City, Postal</div>
              </div>
              <div className="col-sm-9 col-xs-9 purchase-info">
                <h4 className="info-code">{result.id}</h4>
                <div className="info-date">Datum : {result.date}</div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-xs-12 table-responsive">
                <table
                  className="table table-condensed"
                  border="0"
                  cellSpacing="0"
                  cellPadding="0"
                  width="100%"
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Titel</th>
                      <th>Hoeveelheid</th>
                      <th>Prijs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!isLoading ? (
                      result.products.map((element, index) => {
                        return (
                          <tr key={index}>
                            <td>{index}</td>
                            <td>{element.product.title}</td>
                            <td>{element.quantity}</td>
                            <td>{element.price}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="4" />
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan="2">
                        Betaal methode: {result.bank}
                        <br />
                        Information content
                      </th>
                      <th colSpan="2" />
                    </tr>
                    <tr>
                      <th>Totaal zonder korting</th>
                      <th className="text-right">{result.total}€</th>
                      <th>Betaald</th>
                      <th className="text-right">
                        {result.totalWithDiscount}€
                      </th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Step3;
