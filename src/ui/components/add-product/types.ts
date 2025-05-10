export interface Category {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    products: string[];
  }
  
  export interface JwtPayload {
    id: number;
  }
  
  export interface FormData {
    status: string;
    title: string;
    description: string;
    price: string;
    categoryId: string;
    latitude: number;
    longitude: number;
  }