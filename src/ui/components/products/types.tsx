
export interface ProductImage {
  id: number;
  imageUrl: string;
  productId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductUser {
  id: number;
  username: string;
  avatar: string;
}

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
  images: ProductImage[];
  user: ProductUser;
}

export interface PaginatedProducts {
  data: Product[];
}


export interface ProductCardProps {
  product: Product;
}

export interface Location {
  city: string;
  district: string;
}



export interface Favorite {
  id: number;
  productId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  product: {
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
    images: { id: number; imageUrl: string; productId: number; createdAt: string; updatedAt: string }[];
    user: {
      id: number;
      username: string;
      avatar: string;
    };
  };
  user: {
    id: number;
    username: string;
    avatar: string;
  };
}