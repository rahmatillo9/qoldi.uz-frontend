

export interface ChatRoom {
  id: number;
  productId: number;
  user1Id: number;
  user2Id: number;
  createdAt: string;
  updatedAt: string;
  user1: {
    id: number;
    username: string;
    avatar: string | null;
  };
  user2: {
    id: number;
    username: string;
    avatar: string | null;
  };
  product: {
    images: {
      id: number;
      imageUrl: string;
      productId: number;
    }[];
    status: string;
    price: React.ReactNode;
    description: React.ReactNode;
    id: number;
    title: string;
  };
  messages: Message[];
}


export interface ChatInputProps {
  newMessage: string;
  setNewMessage: (value: string) => void;
  handleSendMessage: () => void;
}


export interface Message {
  isRead: boolean;
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  chatRoomId: number;
  createdAt: string;
}

export interface ChatMessagesProps {
  messages: Message[];
  currentUserId: number | null;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}


export interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    title: string;
    user: { id: number; username: string; avatar: string };
  };
}


export interface ChatHeaderProps {
  onClose: () => void;
  username: string;
  avatar: string;
  title: string;
}