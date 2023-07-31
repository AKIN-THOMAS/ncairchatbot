import React, { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "../styles/styles.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
const ChatBot = () => {
  // const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  const apiKey = "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";
  // console.log(apiKey);
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ncairAI",
      sender: "ncairAI",
    },
  ]);
  const [typing, setTyping] = useState(false);

  const handleSend = async (message) => {
    const newmessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };

    const latestMessages = [...messages, newmessage];

    //update the messages state
    setMessages(latestMessages);
    //set typing
    setTyping(true);

    //process messages to the NCAIR Chatbot (gradio API)
    await processMessagesToNCAIR(latestMessages);
  };

  const processMessagesToNCAIR = async (chatMessages) => {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ncairAI") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const systemMessage = {
      role: "system",
      content:
        "You are an assistent to the National Center for Artificial Intelligence and Robotics. Be casual in your conversation yet be professional",
    };

    // const apiRequestBody = {
    //   model: "gpt-3.5-turbo",
    //   messages: [systemMessage, ...apiMessages],
    // };
    const question = {
      query: "What is NCAIR?",
    };
    // https://api.openai.com/v1/chat/completions
    await fetch("http://127.0.0.1:8000/chatbot.chain/run", {
      method: "POST",
      headers: {
        // Authorization: "Bearer " + apiKey,
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        // console.log(data);
        // console.log(data.choices[0].message.content);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ncairAI",
          },
        ]);
        setTyping(false);
      });
  };
  return (
    <div className="App">
      <div className="chatbot">
        <MainContainer>
          <ChatContainer>
            <MessageList
              typingIndicator={
                typing ? <TypingIndicator content="ncairAI is typing" /> : null
              }
            >
              {messages.map((value, index) => {
                return <Message key={index} model={value} />;
              })}
            </MessageList>
            <MessageInput
              placeholder="Ask question here..."
              onSend={handleSend}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};

export default ChatBot;
