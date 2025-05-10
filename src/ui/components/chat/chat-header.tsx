
import { useTranslations } from "next-intl";
import { ModalHeader, Button } from "@heroui/react";
import Avatar from "@/ui/components/avatar";
import { X } from "lucide-react";
import { ChatHeaderProps } from "./type";



export default function ChatHeader({ onClose, username, avatar, title }: ChatHeaderProps) {
  const t = useTranslations("ProductDetail");

  return (
    <ModalHeader className="flex items-center gap-3 border-b border-white/10 relative">
      <Avatar
        src={`${process.env.NEXT_PUBLIC_API_URL}${avatar}`}
        size={40}
        bordered={true}
      />
      <div>
        <p className="font-bold text-white">{username}</p>
        <p className="text-sm text-gray-400">{title}</p>
      </div>
      <Button
        onClick={onClose}
        className="absolute top-2 right-2 text-white"
        variant="light"
        size="sm"
      >
        <X size={20} />
      </Button>
    </ModalHeader>
  );
}
