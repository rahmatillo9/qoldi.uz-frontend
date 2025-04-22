
import { useTranslations } from "next-intl";

interface StepIndicatorProps {
  step: number;
}

export default function StepIndicator({ step }: StepIndicatorProps) {
  const t = useTranslations("AddProductPage");

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full ${
            step >= 1 ? "bg-teal-600 dark:bg-teal-500 " : "bg-gray-200 dark:bg-gray-700 "
          }`}
        >
          1
        </div>
        <div
          className={`flex-1 h-1 mx-2 ${step >= 2 ? "bg-teal-600 dark:bg-teal-500" : "bg-gray-200 dark:bg-gray-700"}`}
        ></div>
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full ${
            step >= 2 ? "bg-teal-600 dark:bg-teal-500 " : "bg-gray-200 dark:bg-gray-700 "
          }`}
        >
          2
        </div>
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-sm font-medium ">{t("productInformation")}</span>
        <span className="text-sm font-medium ">{t("productImages")}</span>
      </div>
    </div>
  );
}
