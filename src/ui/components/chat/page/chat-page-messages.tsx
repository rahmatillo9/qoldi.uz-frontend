import { ChatPageMessagesProps } from "./type";

export default function ChatPageMessages({
  messages,
  currentUserId,
  messagesEndRef,
}: ChatPageMessagesProps) {
  console.log("ChatPageMessages", messages, currentUserId, messagesEndRef);
  
  return (
    <div className="flex-1 overflow-y-auto mb-4 bg-gray-800/50 rounded-lg p-4">
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
            <p className="text-xs text-gray-300 mt-1 flex justify-between items-center gap-1">
              <span>{new Date(message.createdAt).toLocaleTimeString()}</span>
              {message.senderId === currentUserId && (
                <span>{message.isRead ? "✔✔️" : "✔️"}</span>
              )}
            </p>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
