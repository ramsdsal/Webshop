import React, { Component } from "react";
import { Container, Grid, Header, Segment } from "semantic-ui-react";
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
              backgroundColor:  ['rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(245, 199, 102, 0.6)',
              'rgba(75, 99, 86, 0.6)' ] 
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
    .then(data => {this.setState({
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
      <Grid divided='vertically'>
    <Grid.Row columns={2}>
      <Grid.Column>
      <Header as='h2' attached='top' textAlign="center">
      Verkocht afgelopen maanden
    </Header>
    <Segment attached>
      <Bar
          height={200}
          width={200}
          data = { this.state.chartData }
          options={{
            maintainAspectRatio: false
           }}
        />
        </Segment>
      </Grid.Column>
      <Grid.Column>
      <Header as='h2' attached='top' textAlign="center">
      Meest verkochte producten
    </Header>
    <Segment attached>
      <Pie
        height={200}
        width={200}
          data={this.state.chartData}
          options={{
            maintainAspectRatio: false,
            legend:{
              display:true,
              position:'right'
            }
           }}
        />
        </Segment>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row columns={1}>
      <Grid.Column>
      <Header as='h2' attached='top' textAlign="center">
      Verloop in product prijs
    </Header>
    <Segment attached>
      <Line
          height={150}
          width={150}
          data = { this.state.chartData }
          options={{
            maintainAspectRatio: false,
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
        </Segment>
      </Grid.Column>
    </Grid.Row>
  </Grid>
  </Container>

    );
  }
}

export default Statistics;

