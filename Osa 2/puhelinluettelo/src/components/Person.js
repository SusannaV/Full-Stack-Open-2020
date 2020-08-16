import React from "react";

const Person = (props) => {
  
  const Button = ({handleClick}) => (
    <button onClick={handleClick}>Delete</button>
  );

  return (
    <p>
      {props.dude.name} {props.dude.number}
      <Button handleClick={() => props.handleDelete(props)}/>
    </p>
  );
};

export default Person;
