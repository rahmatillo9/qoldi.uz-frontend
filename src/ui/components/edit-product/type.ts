export interface ProductImage {
    id: number;
    imageUrl: string;
    productId: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface ImageManagerProps {
    images: File[]; // Yangi yuklanayotgan rasmlar
    setImages: (images: File[]) => void;
    existingImages: ProductImage[]; // Mavjud rasmlar (odatda serverdan)
    imagesLoading: boolean;
    onDeleteImage: (imageId: number) => void;
  }
  



  interface Category {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    products?: string[];
  }
  
export  interface EditProductFormProps {
    formData: {
      title: string;
      description: string;
      price: string;
      categoryId: string;
      latitude: number;
      longitude: number;
      status: string;
    };
    categories: Category[];
    step: number;
    setStep: (step: number) => void;
    images: File[];
    setImages: (images: File[]) => void;
    existingImages: string[];
    imagesLoading: boolean;
    loading: boolean;
    formError: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } }) => void;
    handleLocationChange: (lat: number, lng: number) => void;
    handleDeleteImage: (imageId: number) => void;
    handleSubmit: (e?: React.FormEvent | React.MouseEvent) => void;
  }