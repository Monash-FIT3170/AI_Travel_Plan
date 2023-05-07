import React, {useState} from 'react'
import Alert from 'react-bootstrap/Alert'
import ExampleButton from './ExampleButton'

export default function ExampleBox() {
  
  /**
   * here is an example of a state. React components can have states. They are basically a component's variables. 
   * We use variables this way because a react component is reloaded when a state change happens (when you call setDisplayText)
   * The state given here is composed of an array of 2 elements
   * The first element in the array is the variable that stores the state
   * the second element in the array is a method that can be used to update the value in displayText
   * The paramater of useState just sets the default value of displayText. if i wanted the default value to be "hello", i would just add that instead of the ""
   * If you'd like, watch this video to explain states a little more. Mainly the first 4 minutes, particularly the explanation of the useState hook
   * https://www.youtube.com/watch?v=TNhaISOUy6Q&ab_channel=Fireship
  */
  const [displayText, setDisplayText] = useState(""); // <- the value in useState is the default value of displayText that is set. Initially it is a blank string.
  const [clickSwitch, setClickSwitch] = useState(false); // <- the value can be other data types like boolean

  /**
   * This function handles a click of the button.
   * It will try getting data from the backend and updating the displayText state when it gets it. 
   * it is asynchronous because it needs to wait for the server to get a response. 
   */
  const handleClick = async () =>  { // need the async keyword to make the function here asynchronous
    //here is where the magic happens. Here is how you can use the get request in express to get something from the backend
    const response = await fetch(`http://localhost:4000/api/exampleRoute`)
    
    //accesses the data portion of the response
    const dataOnServer = await response.text()
    const textOnServer = JSON.parse(dataOnServer).message
    
    // A simple switching mechanism, that shows text when clicked once, then deletes text when clicked again.
    if (clickSwitch) {
      setClickSwitch(false)
      setDisplayText("")
    }
    else {
      setClickSwitch(true)
      setDisplayText(textOnServer)
    }
  }
  
    // The rest of the code here just shows the components and HTML that will be displayed in this component.
    return (
    <Alert variant="success">
      <Alert.Heading>Wow look! A button! I wonder what happens if you click it...</Alert.Heading>
      
      <ExampleButton onClick={handleClick}>Please click me</ExampleButton>
      
      <hr /> {/* <-- line separating button from text below it */}

      <p> {displayText} </p> {/* here the text is displayed. Before making an api call, the displayText has default value of "" thus no text is showing intially*/}
    </Alert>
  )
}
