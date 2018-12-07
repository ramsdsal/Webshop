import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import "./Statistics.css";
import {Pie, Line} from 'react-chartjs-2';

export class Statistics extends Component {

constructor(props){
  super(props);
  this.state = {
    chartData: {
      labels: ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni'],
      datasets: [
        {
          label:'Aantal verkocht',
          data:[
              10,
              2,
              3,
              4,
              5,
              6
          ],
          backgroundColor:'rgba(54, 162, 235, 0.6)',  
        }
      ]
    }
  }
}

  render() {
   
    return (
      <Container style={{ marginTop: "7em" }}>
        <Line
          height={50}
          width={50}
          data={this.state.chartData}
          options={{
            maintainAspectRatio: false,
            title:{
              display:true,
              text:'Verkoop 2018',
              fontSize: 25
            },
            legend:{
              display:true,
              position:'bottom'
            },
            scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
           }}
        />
        <Pie
        height={50}
        width={50}
          data={this.state.chartData}
          options={{
            maintainAspectRatio: false,
            title:{
              display:true,
              text:'Product meest verkocht',
              fontSize: 25
            },
            legend:{
              display:true,
              position:'right'
            }
           }}
        />
        
        
      </Container>
    );
  }
}

export default Statistics;

