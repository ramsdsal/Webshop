import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import "./Statistics.css";
import {Pie, Line} from 'react-chartjs-2';


export class Statistics extends Component {
  
  constructor(props){
    super(props);
      this.state = {
        chartData: {      
          labels: ["januari", "februari", "maart", "april", "mei", "juni", "september", "december"],
          datasets: [
            {
              label:'Aantal verkocht',
              data: [1,1,1,1,1,1,1],
              backgroundColor:'rgba(54, 162, 235, 0.6)',  
            }
          ]
        }
      }
  fetch("/api/Order/GetMonth")
    .then(response => response.json())
    .then(data => {
      this.setState({
        ...this.state,
        data : data
      });
      this.state.chartData.labels = this.state.data.months
      this.state.chartData.datasets[0].data = this.state.data.sums
      console.log(this.state.data)
      console.log(this.state.chartData.datasets[0].data)
      console.log(this.state.chartData.labels)
    });

}

  render() {
   
    return (
      <Container style={{ marginTop: "7em" }}>
        <Line
          height={25}
          width={25}
          data = { this.state.chartData }
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
        height={25}
        width={25}
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

