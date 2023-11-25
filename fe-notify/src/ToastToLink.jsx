import React from "react";

const ToastToLink = ({ link, title, body }) => {
  return (
    <a href={link} className="custom-message">
      <h5>{title}</h5>
      <span>{body}</span>
    </a>
  );
};

export default ToastToLink;
