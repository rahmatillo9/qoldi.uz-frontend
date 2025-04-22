
import { useTranslations } from "next-intl";
import { Input,  Select, SelectItem } from "@heroui/react";
import { MapPin, DollarSign, Tag, FileText } from "lucide-react";
import MapPicker from "@/ui/components/map-picker";
import { Category, FormData } from "./types";

interface ProductFormProps {
  formData: FormData;
  categories: Category[];
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } }
  ) => void;
  handleLocationChange: (lat: number, lng: number) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function ProductForm({
  formData,
  categories,
  handleChange,
  handleLocationChange,
  handleSubmit,
}: ProductFormProps) {
  const t = useTranslations("AddProductPage");

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          {t("productTitle")}
        </label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder={t("titlePlaceholder")}
          required
          maxLength={100}
          className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 max-w-full"
          startContent={<FileText className="text-gray-400" size={18} />}
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          {t("description")}
        </label>
        <Input
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder={t("descriptionPlaceholder")}
          maxLength={500}
          required
          className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 max-w-full resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            {t("price")}
          </label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder={t("pricePlaceholder")}
            min="0"
            step="0.01"
            required
            className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            startContent={<DollarSign className="text-gray-400" size={18} />}
          />
        </div>

        <div>
          <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            {t("category")}
          </label>
          <Select
            id="categoryId"
            name="categoryId"
            placeholder={t("categoryPlaceholder")}
            required
            className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            startContent={<Tag className="text-gray-400" size={18} />}
            selectedKeys={formData.categoryId ? [formData.categoryId] : []}
            onSelectionChange={(keys) => {
              const selectedKey = Array.from(keys)[0] as string;
              handleChange({ target: { name: "categoryId", value: selectedKey } });
            }}
            listboxProps={{
              className: "bg-white dark:bg-gray-900 max-h-60 overflow-y-auto",
            }}
          >
            {categories.map((category) => (
              <SelectItem key={category.id.toString()}>{category.name}</SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">{t("location")}</label>
        <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
          <MapPicker onLocationChange={handleLocationChange} />
        </div>
        <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
          <MapPin className="mr-1" size={16} />
          <span>
            {t("latitude")}: {formData.latitude.toFixed(6)}, {t("longitude")}: {formData.longitude.toFixed(6)}
          </span>
        </div>
      </div>
    </form>
  );
}
