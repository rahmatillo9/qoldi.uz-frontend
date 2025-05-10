import { User } from "../../profile/taype";
import { Message } from "@/ui/components/chat/type";
export interface ChatPageHeaderProps {
  otherUser: User | null;
  productTitle: string;
}

export interface ChatPageInputProps {
    newMessage: string;
    setNewMessage: (value: string) => void;
    handleSendMessage: () => void;
  }


  export interface ChatPageMessagesProps {
    messages: Message[];
    currentUserId: number | null;
    messagesEndRef: React.RefObject<HTMLDivElement | null>;
    
  }
  