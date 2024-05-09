import "./App.css";
import "@chatscope/chat-ui-kit-react-styles/dist/default/styles.main.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
} from "@chatscope/chat-ui-kit-react-styles/dist/default/styles.main.css";

function App() {
  return (
    <div className="App">
      <div style={{ position: "relative", height: "800px", width: "700px" }}>
        <MainContainer></MainContainer>
        <ChatContainer></ChatContainer>
        <MessageList></MessageList>
      </div>
    </div>
  );
}

export default App;
