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

const App = (props) => {
  let points = new Array(anecdotes.length).fill(0)
  
  const [selected, setSelected] = useState(0)
  const [point, setPoint] = useState(points)
  console.log('Appin sisäinen point', point)
  
  const SelectRandom = () =>{
    let randomNumber = Math.floor((Math.random() * anecdotes.length));
    console.log(randomNumber)
    setSelected(randomNumber)
  }

  let Vote = () => {

    console.log('alkup', point)

    let voted = [...point]
    console.log('voted ennen ', voted)
    console.log('selected ennen', voted[selected])
    voted[selected] += 1
    console.log('selected jälkeen', voted[selected])
    console.log('voted', voted)
    setPoint (voted)
    console.log('point', point)
  }

    return (
    <div>
      <p>{props.anecdotes[selected]}</p>
      <p>This anecdote has {point[selected]} votes</p>
      <Button onClick={SelectRandom} text='Give me a new one'/>
      <Button onClick={Vote} text='Vote'/>
      
      
    </div>
    
  )
  
}

ReactDOM.render(
  
  <App anecdotes={anecdotes}/>,
  document.getElementById('root'),
  
)