import ChatBox from '../components/chatbox/ChatBox';
import Background from "../components/Background";
import BackgroundImage from "../components/BackgroundImage";

export function ChatPage() {
  return (
    <>
      <BackgroundImage />
      <Background>
        <Chatbox></Chatbox>
      </Background>
    </>
  );
}
