
import { useTranslations } from "next-intl";
import { ModalFooter, Input, Button } from "@heroui/react";
import { Send } from "lucide-react";

import { ChatInputProps } from "./type";

export default function ChatInput({ newMessage, setNewMessage, handleSendMessage }: ChatInputProps) {
  const t = useTranslations("ProductDetail");

  return (
    <ModalFooter className="chat-modal-footer border-t border-white/10">
      <Input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder={t("sendMessage")}
        className="flex-1 bg-gray-700 text-white border-gray-600"
        onKeyPress={(e) => {
          if (e.key === "Enter") handleSendMessage();
        }}
      />
      <Button
        onClick={handleSendMessage}
        className="ml-2 bg-blue-500 hover:bg-blue-600"
        disabled={!newMessage.trim()}
      >
        <Send size={20} />
      </Button>
    </ModalFooter>
  );
}
