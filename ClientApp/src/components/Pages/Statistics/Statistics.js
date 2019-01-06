import React, { Component } from "react";
import { Container, Grid, Header, Segment, Dropdown, Statistic, Form } from "semantic-ui-react";
import "./Statistics.css";
import {Pie, Line, Bar} from 'react-chartjs-2';


export class Statistics extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      defaultstats : true,
      movieId : "", 
      dropDownList : [
    ],
      barChartData: {
        labels : [ "A", "B" ],
        datasets: [
          {
            label:'2018',
            data: [],
            backgroundColor:  ['rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(245, 199, 102, 0.6)',
            'rgba(75, 99, 86, 0.6)',
            'rgba(70, 109, 236, 0.6)',
            'rgba(200, 180, 100, 0.6)',
            'rgba(75, 255, 255, 0.6)',
            'rgba(200, 99, 86, 0.6)'
           ] 
          }
        ]
      },
      pieChartData: {
        labels:[],
        datasets: [
          {
            label : 'Producten meest verkocht',
            data : [],
            backgroundColor:[
              'rgba(54, 162, 235, 0.6)',
              'rgba(33, 189, 111, 0.6)',
              'rgba(77, 90, 100, 0.6)',
              'rgba(201, 100, 90)',
              'rgba(200, 180, 97)'
            ]
          }
        ]
      },
      lineChartData: {
        labels:[],
        datasets : [
          {
            label : "Prijsverandering",
            data : [ ],
            backgroundColor : 'rgba(53, 162,220, 0.5)'
          }
        ]
      }
    }
    console.log(this.state.barChartData.datasets)
    fetch("/api/Order/GetStats/")
      .then(response => response.json())
      .then(data => {this.setState({
          ...this.state,
          data : data,
          dropDownList : data.dropdown,
          barChartData : {
            ...this.state.barChartData,
            labels : data.months,
            datasets : 
            [{...this.state.barChartData.datasets[0], data : data.sums }]
          },
          pieChartData : {
            ...this.state.pieChartData,
            labels : data.titles,
            datasets : 
            [{...this.state.pieChartData.datasets[0], data : data.total}]
          }
        });
        console.log(this.state.data)
        var date = new Date();
        console.log(date)
        console.log(date.getFullYear())
      });      
  };
  
  changeMovieId = (e, {value}) =>
  {
    fetch("/api/Order/GetPriceChanges/" + value)
      .then(response => response.json())
      .then(data => {this.setState({
        ...this.state,
        lineChartData : {
          ...this.state.lineChartData,
          labels : data.dates,
          datasets : 
          [{...this.state.lineChartData.datasets[0], data : data.prices}]
        
        }
      })
    })
  };

  renderGraphsProducts()
  {
    return (
      <Container style={{ marginTop: "7em" }}>
      <Segment>
      <Header as = 'h2' attached='top' textAlign='center'>Producten</Header>
      <Form.Button onClick={this.setState({...this.state, defaultstats : false})}>Klanten</Form.Button>
      <Grid divided='vertically'>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Header as='h2' attached='top' textAlign="center">
              Bruto winst webshop
              </Header>
            <Segment attached>
              <Bar
                height={200}
                width={200}
                data = { this.state.barChartData }
                options={{
                maintainAspectRatio: false,
                scales : {
                yAxes:[{
                  scaleLabel : {
                    display : true,
                    labelString : 'In €'
                  },
                  ticks: {
                    beginAtZero : true
                  }
                }],
                xAxes:[{
                  scaleLabel : {
                    display : true,
                    labelString : 'maanden'
                  }
                }]
              }
            }
          } />
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
              data={this.state.pieChartData}
              options={{
              maintainAspectRatio: false,
              legend:{
                display:true,
                position:'right'
              },
              scales : {
                yAxes : {
                  scaleLabel : {
                    display : true,
                    labelString : 'copies sold'
                  }
                }
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
          data = { this.state.lineChartData }
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
        <Dropdown placeholder='Select Movie' fluid selection options={this.state.dropDownList} onChange={this.changeMovieId}/>
      </Grid.Column>
    </Grid.Row>
  </Grid>
  </Segment>
  </Container>
    );
  }

  changePage()
  {
    this.setState({...this.state, defaultstats : true})
  }

  renderStatsCustomer()
  {
    return (
    <Container style={{ marginTop : "7em"}}>
        <Header>Klanten</Header>
      <Segment>
        <Grid divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header as='h2' attached=''top textAlign='center'></Header>
            </Grid.Column>
          </Grid.Row>

        <Statistic label='Aantal Klanten' value='20' />
        </Grid>
      </Segment>
    </Container>
    );
  }

  render() {
    const contents = this.renderGraphsProducts()

    return contents;
  }
}

export default Statistics;

