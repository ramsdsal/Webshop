import React, { Component } from "react";
import { Button, Card, Container, Icon, Image, Grid } from "semantic-ui-react";

export class Home extends Component {
  displayName = Home.name;

  render() {
    return (
      <Container style={{ marginTop: "7em" }}>
        <Grid columns={4} stackable>
          {/* ProductItem */}
          <Grid.Column>
            <Card>
              <Image src="https://source.unsplash.com/random" />
              <Card.Content>
                <Card.Header>Vennon (2018) 30€</Card.Header>
              </Card.Content>
              <Card.Content extra textAlign="right">
                <Button>
                  <Icon name="cart" />
                </Button>
                <Button>
                  <Icon name="heart" />
                </Button>
              </Card.Content>
            </Card>
          </Grid.Column>
          {/* End ProductItem */}
          <Grid.Column>
            <Card>
              <Image src="https://source.unsplash.com/random" />
              <Card.Content>
                <Card.Header>Vennon (2018) 30€</Card.Header>
              </Card.Content>
              <Card.Content extra textAlign="right">
                <Button>
                  <Icon name="cart" />
                </Button>
                <Button>
                  <Icon name="heart" />
                </Button>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card>
              <Image src="https://source.unsplash.com/random" />
              <Card.Content>
                <Card.Header>Vennon (2018) 30€</Card.Header>
              </Card.Content>
              <Card.Content extra textAlign="right">
                <Button>
                  <Icon name="cart" />
                </Button>
                <Button>
                  <Icon name="heart" />
                </Button>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card>
              <Image src="https://source.unsplash.com/random" />
              <Card.Content>
                <Card.Header>Vennon (2018) 30€</Card.Header>
              </Card.Content>
              <Card.Content extra textAlign="right">
                <Button>
                  <Icon name="cart" />
                </Button>
                <Button>
                  <Icon name="heart" />
                </Button>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card>
              <Image src="https://source.unsplash.com/random" />
              <Card.Content>
                <Card.Header>Vennon (2018) 30€</Card.Header>
              </Card.Content>
              <Card.Content extra textAlign="right">
                <Button>
                  <Icon name="cart" />
                </Button>
                <Button>
                  <Icon name="heart" />
                </Button>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card>
              <Image src="https://source.unsplash.com/random" />
              <Card.Content>
                <Card.Header>Vennon (2018) 30€</Card.Header>
              </Card.Content>
              <Card.Content extra textAlign="right">
                <Button>
                  <Icon name="cart" />
                </Button>
                <Button>
                  <Icon name="heart" />
                </Button>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}
