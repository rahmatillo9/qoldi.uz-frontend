
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@heroui/react";
import { CheckCircle } from "lucide-react";

export default function SuccessMessage() {
  const t = useTranslations("AddProductPage");
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="bg-teal-100 dark:bg-teal-900/30 rounded-full p-4 mb-4">
        <CheckCircle className="h-16 w-16 text-teal-600 dark:text-teal-300" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">{t("successTitle")}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{t("successDescription")}</p>
      <Button
        className="bg-teal-600 dark:bg-teal-500 text-white hover:bg-teal-700 dark:hover:bg-teal-400"
        onClick={() => router.push("/pofile")}
      >
        {t("viewProducts")}
      </Button>
    </div>
  );
}
