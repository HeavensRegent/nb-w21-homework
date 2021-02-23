import React from "react";
import "./style.css";
import { Button } from "@material-ui/core";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function DeleteBtn(props) {
  return (
    <Button className="delete-btn" >
      <span {...props} role="button" tabIndex="0">
        Delete ✗
      </span>
    </Button>
  );
}

export default DeleteBtn;