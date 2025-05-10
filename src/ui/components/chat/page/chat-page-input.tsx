
import { useTranslations } from "next-intl";
import { Send } from "lucide-react";
import { ChatPageInputProps } from "./type";



export default function ChatPageInput({
  newMessage,
  setNewMessage,
  handleSendMessage,
}: ChatPageInputProps) {
  const t = useTranslations("chat2");

  return (
    <div className="flex items-center p-2 bg-gray-800/50 rounded-lg border border-gray-700">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder={t("typeMessage")}
        className="flex-1 bg-transparent text-white border-none focus:outline-none px-2"
        onKeyPress={(e) => {
          if (e.key === "Enter") handleSendMessage();
        }}
      />
      <button
        onClick={handleSendMessage}
        className="ml-2 text-blue-500 hover:text-blue-400"
        disabled={!newMessage.trim()}
      >
        <Send size={20} />
      </button>
    </div>
  );
}
