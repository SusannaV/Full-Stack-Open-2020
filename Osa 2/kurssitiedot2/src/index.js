import React from "react";
import ReactDOM from "react-dom";

const Course = (props) => {
  const Header = ({ name }) => {
    return <h2>{name}</h2>;
  };

  const Content = ({ courselist }) => {
    const total = courselist.reduce((s, t) => s + t.exercises, 0);
    return (
      <div>
        {courselist.map((part) => (
          <p key={part.id}>
            <Part oneCourse={part} />
          </p>
        ))}
        <p>
          <b>Total of {total} excercises</b>
        </p>
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
      {props.course.map((acourse) => (
        <div key={acourse.id}>
          <Header name={acourse.name} />
          <Content courselist={acourse.parts} />
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const courses = [
    {
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
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      <h1> Web development curriculum</h1>
      <Course course={courses} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
