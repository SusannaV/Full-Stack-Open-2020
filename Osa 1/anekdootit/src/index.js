import React, { useState } from 'react'
import ReactDOM from 'react-dom'

  const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
      {text}
    </button>
  )
 
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const ReturnMostVoted = (props) => {
    let mostVoted = 0;
    let index = -1;
    for (let i = 0; i<props.list.length; i++){
      if (props.list[i]>mostVoted){
        mostVoted=props.list[i];
        index = i;
      }
    }
    if (index===-1){
    return (
      <> </>
    )
    }
    return(
      <>
      <h2>Anecdote with most votes</h2>
      <p>{props.anecdotes[index]}</p>
      <p>This anecdote has {props.list[index]} votes</p>
      </>
    )
  }


const App = (props) => {
  let points = new Array(anecdotes.length).fill(0)
  
  const [selected, setSelected] = useState(0)
  const [point, setPoint] = useState(points)
  
  const SelectRandom = () =>{
    let randomNumber = Math.floor((Math.random() * anecdotes.length));
    setSelected(randomNumber)
  }

  let Vote = () => {
    let voted = [...point]
    voted[selected] += 1
    setPoint (voted)
  }

    return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{props.anecdotes[selected]}</p>
      <p>This anecdote has {point[selected]} votes</p>
      <Button onClick={SelectRandom} text='Give me a new one'/>
      <Button onClick={Vote} text='Vote'/>
      <ReturnMostVoted list={point} anecdotes={anecdotes}/>
    </div>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes}/>,
  document.getElementById('root'),
)