export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    status: string;
    categoryId: number;
    userId: number;
    latitude: number;
    longitude: number;
    createdAt: string;
    updatedAt: string;
    category: { id: number; name: string };
    images: { id: number; imageUrl: string; productId: number; createdAt: string; updatedAt: string }[];
    user: { id: number; username: string; avatar: string };
  }


 export interface ProductMapProps {
    latitude: number;
    longitude: number;
    title: string;
  }


 export interface ProductInfoProps {
    product: {
      id: number;
      title: string;
      price: number;
      status: string;
      description: string;
      user: { id: number; username: string; avatar: string };
    };
    currentUserId: number; // Joriy foydalanuvchi ID
  }
  