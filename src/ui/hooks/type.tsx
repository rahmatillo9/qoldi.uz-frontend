export interface ChatModalProps {
    isOpen: boolean;
    product: {
      id: number;
      user: { id: number };
    };
  }
  
  export interface Message {
 
    id: number;
    productId: number;
    senderId: number;
    receiverId: number;
    content: string;
    chatRoomId: number;
    createdAt: string;
    updatedAt: string;
    isRead: boolean; // isRead maydoni qo'shildi
  }
  
 export interface ChatRoomResponse {
    id: number;
    productId: number;
    user1Id: number;
    user2Id: number;
    createdAt: string;
    updatedAt: string;
    messages: Message[];
  }
  

export interface RawCategory {
  id: number;
  name: {
    uz: string;
    ru: string;
    en: string;
  };
  createdAt: string;
  updatedAt: string;
}



export interface ProductImage {
  id: number;
  imageUrl: string;
  productId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  user: string;
  id: number;
  title: string;
  description: string;
  price: number;
  status: "available" | "sold";
  categoryId: number;
  userId: number;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
  images: ProductImage[];
}

