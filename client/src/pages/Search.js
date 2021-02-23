import React, { useState, useEffect } from "react";
import GeneralBtn from "../components/GeneralBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import SearchBar from '../components/SearchBar';

function Search() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState({});
  const [search, setSearch] = useState('');

  // Load all books and store them with setBooks
  useEffect(() => {
    doSearch(null, "Way of Kings");
  }, [])

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function saveBook(event) {
    event.preventDefault();
    if (formObject.title && formObject.author) {
      API.saveBook({
        title: formObject.title,
        author: formObject.author,
        synopsis: formObject.synopsis
      })
        .catch(err => console.log(err));
    }
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function doSearch(event, searchText) {
    if(event) {
      event.preventDefault();
    }

    if(!searchText)
    {
      return;
    }

      API.doSearch({
        search: searchText,
      })
        .then(res => setBooks(res.data))
        .catch(err => console.log(err));
  };

    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <SearchBar
                value={search}
                onChange={value => setSearch(value)}
                onRequestSearch={() => doSearch(search)}
              />
            </Jumbotron>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {books.length ? (
              <List>
                {books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <GeneralBtn onClick={() => saveBook(book._id)} text="View"/>
                    <GeneralBtn onClick={() => saveBook(book._id)} text="Save"/>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }


export default Search;
