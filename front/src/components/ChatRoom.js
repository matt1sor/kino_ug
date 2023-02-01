import io from "socket.io-client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Flex,
  Input,
  List,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";
const socket = io.connect("http://localhost:5556");

function ChatRoom() {
  const userdata = useSelector((state) => state.auth.userData);
  const login = userdata.login;

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const [room, setRoom] = useState(1);

  const joinRoom = () => {
    socket.emit("join_room", room);
    setMessageList([]);
  };

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: login,
        message: currentMessage,
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <Flex align="center" justify="center">
      <VStack>
        <Text>Chat room: {room}</Text>
        <Input
          variant="outline"
          placeholder="room number.."
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        />
        <Button variant="solid" colorScheme="blue" onClick={joinRoom}>
          Join Room
        </Button>
        <Input
          type="text"
          value={currentMessage}
          placeholder="Message..."
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
        />
        <Button variant="solid" colorScheme="blue" onClick={sendMessage}>
          Send
        </Button>

        <Box>
          {messageList.map((data) => (
            <Text>
              {data.author}: {data.message}
            </Text>
          ))}
        </Box>
      </VStack>
    </Flex>
  );
}

//   <div className="chat-window">
//     <div className="chat-header">
//       <p>Live Chat</p>
//     </div>
//     <div className="chat-body">
//       <input
//         placeholder="room"
//         onChange={(e) => {
//           setRoom(e.target.value);
//         }}
//       />
//       <button onClick={joinRoom}>Join room</button>
//       <Box>
//         {messageList.map((messageContent) => {
//           return (
//             <div>
//               <div>
//                 <div>
//                   <p>{messageContent.message}</p>
//                 </div>
//                 <div className="message-meta">
//                   <p>{messageContent.author}</p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </Box>
//     </div>
//     <div>
//       <input
//         type="text"
//         value={currentMessage}
//         placeholder="Hey..."
//         onChange={(event) => {
//           setCurrentMessage(event.target.value);
//         }}
//         onKeyPress={(event) => {
//           event.key === "Enter" && sendMessage();
//         }}
//       />
//       <button onClick={sendMessage}>&#9658;</button>
//     </div>
//   </div>
// );

// return (
//   <div>
//     <input
//       placeholder="room"
//       onChange={(e) => {
//         setRoom(e.target.value);
//       }}
//     />
//     <button onClick={join_room}>join room</button>
//     <input
//       placeholder="massage"
//       onChange={(e) => {
//         setMsg(e.target.value);
//       }}
//     />
//     <button onClick={sendMessage}> Send</button>
//     <h1>msg:</h1>
//     {/*{log}*/}
//     {msgRec}
//   </div>
// );

export default ChatRoom;
