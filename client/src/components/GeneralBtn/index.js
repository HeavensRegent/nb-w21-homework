import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function GeneralBtn(props) {
  return (
    <span className="save-btn" {...props} role="button" tabIndex="0">
      {props.text}
    </span>
  );
}

export default GeneralBtn;
