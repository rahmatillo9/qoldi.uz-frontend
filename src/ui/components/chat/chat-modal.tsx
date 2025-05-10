
'use client'

import { Modal, ModalContent } from "@heroui/react";
import { useChat } from "@/ui/hooks/usechat";
import ChatHeader from "./chat-header";
import ChatMessages from "./chat-messages";
import ChatInput from "./chat-input";
import { ChatModalProps } from "./type";



export default function ChatModal({ isOpen, onClose, product }: ChatModalProps) {
  const { messages, newMessage, setNewMessage, currentUserId, messagesEndRef, handleSendMessage } = useChat({
    isOpen,
    product,
  });

  if (!currentUserId) {
    return null;
  }

  return (
    <>
 

      {isOpen && <div className="modal-backdrop" onClick={onClose}></div>}

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className="sticky-chat-modal"
        backdrop="transparent"
      >
        <ModalContent className="chat-modal-content">
          <ChatHeader
            onClose={onClose}
            username={product.user.username}
            avatar={product.user.avatar}
            title={product.title}
          />
          <ChatMessages
            messages={messages}
            currentUserId={currentUserId}
            messagesEndRef={messagesEndRef}
          />
          <ChatInput
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleSendMessage={handleSendMessage}
          />
        </ModalContent>
      </Modal>
    </>
  );
}
