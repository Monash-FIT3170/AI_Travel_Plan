
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';

import React, {useState}from 'react'

export default function Chatbox() {
  /**
   * State - inputValue: the value in the text box
   */
  const [inputValue, setInputValue] = useState('');

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
   * jsx render 
   */
  return (
    <Box display="flex" alignItems="center">
      {/* <MessageArea>
        MessagesGoHere
      </MessageArea> */}
      <TextField fullWidth multiline onChange={value => handleInputEnter(value)} value={inputValue} maxRows="4" minRows="1" label="Message" variant="outlined" id="fullWidth" 
      InputProps={{
        endAdornment: (
          <IconButton onClick={handleButtonClick} edge="end">
            <SendIcon />
          </IconButton>
        ),
      }}/>
    </Box>
  )
}
