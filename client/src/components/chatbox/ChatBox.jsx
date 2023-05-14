import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import MessageList from './MessageList'
import MessageCard from './MessageCard'

import React, {useState}from 'react'

/**
 * Contains the entire code for a chat box area, including text field, message display.
 * @returns 
 */
export default function ChatBox() {
  /**
   * State - inputValue: the value in the text box
   */
  const [inputValue, setInputValue] = useState('');

  /**
   * State - messges: list of messages in this chat
   */
  const [messages, setMessages] = useState([])

  /**
   * Method call when the button is clicked
   * TODO: need to add openai api routing here.
   * TODO: create new message and add it to the message list
   */
  const handleButtonClick = () => {
    setInputValue('')
  }

  /**
   * Allows the TextField to add more characters whenever there's an input 
   * @param {*} event => event.target.value contains the input when a new character is added.
   */
  const handleInputEnter = (event) => {
    setInputValue(event.target.value)
  }

/**
 * adds a new message to the list of messages
 * @param {String} newMessage new message to add to the message list
 */
  const addMessage = (newMessage) => {
    const newArr = messages + newMessage
    setMessages(newArr)
  }

  /**
   * jsx render 
   */
  return (
    <div>
        <Box display="flex" alignItems="center">
            <MessageList/>
        </Box>
        <Box display="flex" alignItems="center">
            <TextField 
                fullWidth 
                multiline 
                onChange={value => handleInputEnter(value)} 
                value={inputValue} 
                maxRows="4" 
                minRows="1" 
                label="Message" 
                variant="outlined" 
                id="fullWidth" 
                InputProps={{
                endAdornment: (
                    <IconButton onClick={handleButtonClick} edge="end">
                        <SendIcon />
                    </IconButton>
                ),
            }}/>
        </Box>
    </div>
  )
}
