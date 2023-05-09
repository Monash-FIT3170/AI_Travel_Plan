import "../style.css"

const styles = {
    backgroundColor: 'blue',
};

function ChatMain(){
    return(
        <div style = {styles}>
            <h1 className= "ChatMain">This is the main chat page</h1>
        </div>
    )
}

export default ChatMain;