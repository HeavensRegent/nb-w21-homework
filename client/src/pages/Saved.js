import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";
import Jumbotron from "../components/Jumbotron";
import Book from '../components/Book';
import API from "../utils/API";

function Saved(props) {
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState({});

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks();
  }, [])

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then(res => 
        setBooks(res.data)
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => {
        loadBooks()
      })
      .catch(err => console.log(err));
  }

  return (
      <Container fluid>
        <Row>
          <Col size="md-12">
              <Jumbotron>
                <h1>Saved Books</h1>
              </Jumbotron>
              {books.length ? (
                <List>
                  {books.map(book => (
                    <Book
                      key={book.id}
                      id={book._id}
                      title={book.title}
                      subtitle={book.subtitle}
                      authors={book.authors}
                      previewLink={book.link}
                      thumbnail={book.image}
                      description={book.description}
                      deleteBook={deleteBook}
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


export default Saved;
