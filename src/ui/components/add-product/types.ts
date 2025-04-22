export interface Category {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    products: any[];
  }
  
  export interface JwtPayload {
    id: number;
  }
  
  export interface FormData {
    title: string;
    description: string;
    price: string;
    categoryId: string;
    latitude: number;
    longitude: number;
  }