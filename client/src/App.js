import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Search from "./pages/Search";
import Saved from "./pages/Saved";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import { Col, Row, Container } from "./components/Grid";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Container>
          <Row>
            <Col size="md-12">
              <Link to="/search">Search</Link>
              <Link to="/saved">View Saved Books</Link>
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
