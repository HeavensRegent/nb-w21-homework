import React from "react";
import GeneralBtn from "../GeneralBtn";
import { Col, Row, Container } from "../Grid";
import { ListItem } from "../List";

function Book({
  saveBook,
  id,
  title,
  subtitle,
  authors,
  previewLink,
  thumbnail,
  description,
  ...props
}) {
    return (
      <ListItem key={id}>
        <Row>
          <Col size="md-12">
            <h3>
              {title}
            </h3>
            <h4>
              {subtitle}
            </h4>
            <h5>
              Written By {authors}
            </h5>
            
            <GeneralBtn onClick={() => window.open(previewLink, "_blank")} text="View"/>
            <GeneralBtn onClick={() => saveBook(id)} text="Save"/>
          </Col>
        </Row>
        <Row>
          <Col size="md-4">
            <img src={thumbnail}/>
          </Col>
          <Col size="md-8">
            <p>{description}</p>
          </Col>
        </Row>
      </ListItem>
    );
  }


export default Book;
