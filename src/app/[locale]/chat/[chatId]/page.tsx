
'use client'

import { useTranslations } from "next-intl";
import { useChatPage } from "@/ui/hooks/use-chat-page";
import ChatPageHeader from "@/ui/components/chat/page/chat-page-header";
import ChatPageMessages from "@/ui/components/chat/page/chat-page-messages";
import ChatPageInput from "@/ui/components/chat/page/chat-page-input";

export default function ChatPage() {
  const t = useTranslations("chat2");
  const {
    chatRoom,
    messages,
    newMessage,
    setNewMessage,
    currentUserId,
    messagesEndRef,
    handleSendMessage,
    loading,
    error,
    otherUser,
  } = useChatPage();

  if (!currentUserId) return null;
  if (loading) return <div className="text-center py-10">{t("loading")}</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!chatRoom) return <div className="text-center py-10">{t("chatNotFound")}</div>;

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col h-screen  backdrop-blur-md bg-black/30 border-b border-white/10 shadow-md">
      <ChatPageHeader
        otherUser={otherUser}
        productTitle={chatRoom.product.title}
      />
      <ChatPageMessages
        messages={messages}
        currentUserId={currentUserId}
        messagesEndRef={messagesEndRef}
      />
      <ChatPageInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
}
