import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Search from "./pages/Search";
import Saved from "./pages/Saved";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import { Col, Row, Container } from "./components/Grid";
import Button from '@material-ui/core/Button';

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Container>
          <Row>
            <Col size="md-12">
              <Button variant="contained" href="/search">Search</Button>
              <Button variant="contained" href="/saved">View Saved Books</Button>
            </Col>
          </Row>
          <Switch>
            <Route exact path={["/", "/search"]}>
              <Search />
            </Route>
            <Route exact path="/saved">
              <Saved />
            </Route>
            <Route>
              <NoMatch />
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
