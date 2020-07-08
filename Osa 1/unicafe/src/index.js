import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Avg = (props) => {
  let sum = 0;
  let arrlenght = props.list.length;
  
  for (var i=0; i < arrlenght; i++) {
    sum += props.list[i];
  }

  return (
    sum/arrlenght
  )
}

const Pos = (props) => {
  return(
  props.good/props.list.length*100
  )
}



const Statistics = (props) => {
  if (props.all.length===0){
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
    <h2>Statistics:</h2>
    <p>Good: {props.good}</p>
    <p>Neutral: {props.neutral} </p> 
    <p>Bad: {props.bad}</p> 
    <p>All: {props.all.length}</p>
    <p>Average: <Avg list={props.all}/></p>
    <p>Positive: <Pos list={props.all} good={props.good}/> %</p>
    </div>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allReviews, setAllReviews] = useState([])

  const handleGoodClick = () => {
    setGood(good + 1)
    setAllReviews(allReviews.concat(1))
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAllReviews(allReviews.concat(0))
  }
  const handleBadClick = () => {
    setBad(bad + 1)
    setAllReviews(allReviews.concat(-1))
  }


  return (
    <div>
      <h1>Please, give us feedback!</h1>
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} all={allReviews}/>
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)