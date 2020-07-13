import React from "react";
import ReactDOM from "react-dom";

const Course = (props) => {
  console.log("Coursen propsit", props);

  const Header = ({ name }) => {
    return <h1>{name}</h1>;
  };

  const Content = ({ courselist }) => {
    console.log("Contentin propsit", { courselist });

    return (
      <div>
        {courselist.map((part) => (
          <p key={part.id}>
            <Part oneCourse={part} />
          </p>
        ))}
      </div>
    );
  };

  const Part = ({ oneCourse }) => {
    return (
      <>
        {oneCourse.name} {oneCourse.exercises}
      </>
    );
  };

  return (
    <div>
      <Header name={props.course.name} />
      <Content courselist={props.course.parts} />
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    id: 1,
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Testikurssi",
        exercises: 5,
        id: 4,
      },
    ],
  };

  return (
    <div>
      <Course course={course} />
    </div>
  );
};

/*const Header = (props) =>{
    console.log(props)
    return(
      <h1>{props.course}</h1>
    )
  }
  
  const Part =(props)=>{
    console.log(props)
    return(
      <p>{props.name} {props.exercises}</p>
    )
  }
  
  const Content = (props) =>{
    return (
      <>
      <Part name={props.parts[0].name} exercises={props.parts[0].exercises}/>
      <Part name={props.parts[1].name} exercises={props.parts[1].exercises}/>
      <Part name={props.parts[2].name} exercises={props.parts[2].exercises}/>
      </>
    )
  }
  
  const Total = (props)=>{
    console.log(props)
    return (
      <p>Number of exercises {props.taulukko[0].exercises + props.taulukko[1].exercises + props.taulukko[2].exercises}</p>
    )
  }
  return (
    <div>
    <Header course={course.name}/>
    <Content parts={course.parts} />
    <Total taulukko={course.parts} />
    </div>
  )
}*/

ReactDOM.render(<App />, document.getElementById("root"));
