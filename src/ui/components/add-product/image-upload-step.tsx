
import ImageUploader from "@/ui/components/image-uploader";

interface ImageUploadStepProps {
  images: File[];
  setImages: (images: File[]) => void;
}

export default function ImageUploadStep({ images, setImages }: ImageUploadStepProps) {
  return <ImageUploader images={images} setImages={setImages} maxImages={4} />;
}
