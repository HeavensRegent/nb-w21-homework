import React, { useState, useEffect, useRef } from "react";
import GeneralBtn from "../components/GeneralBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import SearchBar from '../components/SearchBar';
import Book from '../components/Book';

function Search() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState({});
  const [search, setSearch] = useState('');


  // Load all books and store them with setBooks
  useEffect(() => {
    doSearch({preventDefault: function(){}}, "Way of Kings");
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
    event.preventDefault();

    if(!searchText && !search)
    {
      return;
    }

      API.doSearch({
        search: search || searchText,
      })
        .then(res => {
          setBooks(res.data.items);
        })
        .catch(err => console.log(err));
  };

    return (
      <Container>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <SearchBar
                value={search}
                onChange={(event) => {
                  setSearch(event.currentTarget.value)
                }}
                autoFocus
                submitHandler={doSearch}
              />
            </Jumbotron>
            {books.length ? (
              <List>
                {books.map(book => (
                  <Book
                    key={book.id}
                    title={book.volumeInfo.title}
                    subtitle={book.volumeInfo.subtitle}
                    authors={book.volumeInfo.authors?.join(",")}
                    previewLink={book.volumeInfo.previewLink}
                    thumbnail={book.volumeInfo.imageLinks?.thumbnail}
                    description={book.volumeInfo.description}
                    saveBook
                  />
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
