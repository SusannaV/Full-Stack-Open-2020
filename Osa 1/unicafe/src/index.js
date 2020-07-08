import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Avg = (props) => {
  let sum = 0;
  let arrlenght = props.length;
  
  for (let i=0; i < arrlenght; i++) {
    sum += props[i];
  }

  return (
    sum/arrlenght
  )
}

const Pos = (props) => {
  console.log(props)
  console.log('hyvät', props.good)
  console.log('pituus', props.all.length)

  return(
  props.good/props.all.length*100 +'%'
  )
  

}


const StatisticLine = (props) => {
  return (
    <p>{props.text} {props.value}</p>
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
    <StatisticLine text="Good: " value = {props.good}/>
    <StatisticLine text="Neutral: " value = {props.neutral}/>
    <StatisticLine text="Bad: " value = {props.bad}/>
    <StatisticLine text="All: " value = {props.all.length}/>
    <StatisticLine text="Average: " value = {Avg(props.all)}/>
    <StatisticLine text="Positive: " value = {Pos(props)}/>
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
      <h2>Statistics:</h2>
      <Statistics good={good} neutral={neutral} bad={bad} all={allReviews}/>
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)