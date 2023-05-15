import Chatbox from '../components/Chatbox';
import { useState } from 'react';
import axios from 'axios';
import {mockTravel_Itinerary1} from '../MockItinerary';
import Background from '../components/Background';
import BackgroundImage from '../components/BackgroundImage';

let reply = [];

export function  ChatPage(){
const [message, setMessages] = useState({prompt: "", reply:""});

const itinerary = {};

const handleChange = (e) => {
  setMessages({...message,prompt: e.target.value});

}
const send = ()=> {
  reply.push(message)
  console.log(reply)  
  axios.post('http://127.0.0.1:4000/api/chatMessage', {prompt: message.prompt, travelItinerary: {}, chatHistory: reply}).then((response) => {
  // reply = {text: response.data.text, type: response.data.type, itinerary: response.data.itinerary}
  console.log(response)
  setMessages((message)=> (response.data.message.chatResponse?{...message, reply: message.show+'\n'+ response.data.message.chatResponse}:{...message, reply: message.show+'\n'+ response.data.message})) })
}
    return (
        <div>
          <div>{message.prompt}</div>
          <div>{message.reply}</div>

          

          <input onChange= {handleChange}></input>
          <button onClick = {send}>Send</button>
        </div>
    )
}
