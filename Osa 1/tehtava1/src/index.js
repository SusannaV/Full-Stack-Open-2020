import React from 'react';
import ReactDOM from 'react-dom';


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14


  const Header = (props) =>{
    return(
      <h1>{props.course}</h1>
    )
  }

  const Part =(props)=>{
    return(
      <p>{props.part} {props.exercises}</p>

    )
  }

  const Content = () =>{
    return (
      <>
      <Part part={part1} exercises={exercises1}/>
      <Part part={part2} exercises={exercises2}/>
      <Part part={part3} exercises={exercises3}/>
      </>
    )
  }

  const Total = (props)=>{
    return (
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    )
  }

  return (
    <div>
      <Header course={course}/>
      <Content />
      <Total />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));