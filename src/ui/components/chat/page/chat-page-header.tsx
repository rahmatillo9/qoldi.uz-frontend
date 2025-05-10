
import { useRouter } from "next/navigation";
import Avatar from "@/ui/components/avatar";
import { ArrowLeft } from "lucide-react";
import { ChatPageHeaderProps } from "./type";
import Link from "next/link";

export default function ChatPageHeader({ otherUser, productTitle }: ChatPageHeaderProps) {
  const router = useRouter();
  const userId = otherUser?.id || null;
  return (
    <div className="flex items-center mb-6">
      <button
        onClick={() => router.push("/messages")}
        className=" mr-4"
      >
        <ArrowLeft size={24} />
      </button>
      {otherUser && (
        <>
           <Link href={`/users/${userId}`} className="block">
          <Avatar
            src={
              otherUser.avatar
                ? `${process.env.NEXT_PUBLIC_API_URL}${otherUser.avatar}`
                : "/images/default-avatar.png"
            }
            size={40}
            bordered={true}
          />
          </Link>
          <div className="ml-4">
            <p className="text-lg font-semibold ">{otherUser.username}</p>
            <p className="text-sm ">{productTitle}</p>
          </div>
        </>
      )}
    </div>
  );
}
