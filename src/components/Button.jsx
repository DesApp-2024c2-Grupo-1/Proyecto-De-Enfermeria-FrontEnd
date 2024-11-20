import React from "react";

function Button({ text, onClick, className, style }) {
  return <button onClick={onClick} className={className} style={style}>{text}</button>;
}


export default Button;
