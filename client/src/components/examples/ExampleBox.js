import React, {useState} from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

export default function ExampleBox() {
  
  /**
   * here is an example of a state. React components can have states. They are sort of like class variables
   * The state given here is composed of an array of 2 elements
   * The first element in the array is the variable that stores the state
   * the second element in the array is a method that can be used to update the value in displayText
   * The paramater of useState just sets the default value of displayText. if i wanted the default value to be "hello", i would just add that instead of the ""/
   * If you'd like, watch this video to explain states a little more. Mainly the first 4 minutes, particularly the explanation of the useState hook
   * https://www.youtube.com/watch?v=TNhaISOUy6Q&ab_channel=Fireship
  */
  const [displayText, setDisplayText] = useState(""); // <- the value in useState is the default value of displayText that is set. Initially it is a blank string.

  const handleClick = () =>  {
    //here is where the magic happens. Here is how you can use the get request in express to get something from the backend
    
    
    setDisplayText("some text has appeared")
    
  }
  
    return (
    <Alert variant="success">
      <Alert.Heading>Wow look! A button! I wonder what happens if you click it...</Alert.Heading>
      
      <Button variant="primary" onClick={handleClick}>Please click me</Button>
      
      <hr /> {/* <-- line separating button from text below it */}

      <p> {displayText} </p> {/* here the text is displayed. Before making an api call, the displayText has default value of "", thus no text is showing */}
    </Alert>
  )
}
