
import { ModalBody } from "@heroui/react";
import { ChatMessagesProps } from "./type";



export default function ChatMessages({ messages, currentUserId, messagesEndRef }: ChatMessagesProps) {
  return (
    <ModalBody className="chat-modal-body">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.senderId === currentUserId ? "justify-end" : "justify-start"
          } mb-2`}
        >
          <div
            className={`max-w-[70%] p-2 rounded-lg ${
              message.senderId === currentUserId
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-white"
            }`}
          >
            <p>{message.content}</p>
            <p className="text-xs text-gray-300 mt-1">
              {new Date(message.createdAt).toLocaleTimeString()}
            </p>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </ModalBody>
  );
}
