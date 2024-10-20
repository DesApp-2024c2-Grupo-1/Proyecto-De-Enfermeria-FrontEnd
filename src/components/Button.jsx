import React from "react";

function Button({ text, onClick, style }) {
  return <button onClick={onClick}>{text}</button>;
}

export default Button;
