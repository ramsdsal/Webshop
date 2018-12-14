import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import "./Statistics.css";
import {Pie, Line, Bar} from 'react-chartjs-2';


export class Statistics extends Component {
  
  constructor(props){
    super(props);
      this.state = {
        chartData1: {      
          labels: ["januari", "februari", "maart", "april", "mei", "juni", "september", "december"],
          datasets: [
            {
              label:'Aantal verkocht',
              data: [1,1,1,1,1,1,1],
              backgroundColor:'rgba(54, 162, 235, 0.6)',  
            }
          ]
        },
        chartData2: {
          labels:[],
          datasets: [
            {
              label : 'Producten meest verkocht',
              data : [],
              backgroundColor:'rgba(54, 162, 235, 0.6)'
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
      this.state.chartData1.labels = this.state.data.months
      this.state.chartData1.datasets[0].data = this.state.data.sums
      console.log(this.state.data)
      console.log(this.state.chartData1.datasets[0].data)
      console.log(this.state.chartData1.labels)
    });
  fetch("/api/Order/mostProducts")
    .then(response => response.json())
    .then(data => {
      this.setState({
        data2 : data
      });
      this.state.chartData2.labels = this.state.data2.titles
      this.state.chartData2.datasets[0].data = this.state.data2.total
      console.log(this.state.data2)
      console.log(this.state.chartData2.labels)
      console.log(this.state.chartData2.datasets[0].data)
    });

}

  render() {
   
    return (
      <Container style={{ marginTop: "7em" }}>
        <Bar
          height={5}
          width={10}
          data = { this.state.chartData1 }
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
        height={10}
        width={10}
          data={this.state.chartData2}
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

