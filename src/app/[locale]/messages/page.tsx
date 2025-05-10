
'use client'

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import API from "@/lib/axios";
import { jwtDecode } from "jwt-decode";
import Avatar from "@/ui/components/avatar";
import { JwtPayload } from "@/ui/components/add-product/types";
import { ChatRoom } from "@/ui/components/chat/type";
import { Trash2, Info } from "lucide-react";
import { Button, Accordion, AccordionItem } from "@heroui/react";
import MessagesSkeleton from "@/ui/components/skeletons/message-skeleton";
import BackButton from "@/ui/components/buttons/exit";

interface ChatRoomWithUnread extends ChatRoom {
  unreadCount: number;
}

export default function MessagesPage() {
  const t = useTranslations("Messages");
  const router = useRouter();
  const [chatRooms, setChatRooms] = useState<ChatRoomWithUnread[]>([]);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // JWT token orqali currentUserId ni olish
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found, redirecting to login...");
      router.push("/login");
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      setCurrentUserId(decoded.id);
    } catch (error) {
      console.error("Token dekod qilishda xato:", error);
      router.push("/login");
    }
  }, [router]);

  // Chatlar ro'yxatini olish
  useEffect(() => {
    if (!currentUserId) return;

    const fetchChatRooms = async () => {
      try {
        setLoading(true);
        const response = await API.get<ChatRoom[]>(`/chat-room/user/${currentUserId}`);
        const chatRoomsData = response.data;

        // Har bir chat xonasi uchun o'qilmagan xabarlar sonini olish
        const chatRoomsWithUnread = await Promise.all(
          chatRoomsData.map(async (chat) => {
            try {
              const unreadResponse = await API.get(
                `/chat-room/${chat.id}/unread-count?receiverId=${currentUserId}`
              );
              console.log(unreadResponse.data.unreadCount);
              
              return {
                ...chat,
                unreadCount: unreadResponse.data.unreadCount || 0,
              };
            } catch (err) {
              console.error(`ChatRoom ${chat.id} uchun o'qilmagan xabarlar sonini olishda xato:`, err);
              return { ...chat, unreadCount: 0 };
            }
          })
        );

        setChatRooms(chatRoomsWithUnread);
      } catch (err) {
        setError("Chatlarni yuklashda xato yuz berdi.");
        console.error("Chatlarni olishda xato:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChatRooms();
  }, [currentUserId]);

  // Chatni o'chirish funksiyasi
  const handleDeleteChat = async (chatId: number) => {
    const confirmDelete = window.confirm(
      t("deleteSelectedChatsWarning")
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/chat-room/${chatId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setChatRooms(chatRooms.filter((chat) => chat.id !== chatId));
    } catch (err) {
      setError("Chatni o'chirishda xato yuz berdi.");
      console.error("Chatni o'chirishda xato:", err);
    }
  };

  if (!currentUserId) return null;
  if (loading) return <MessagesSkeleton />;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
      <BackButton/>
      </div>
      
      <h1 className="text-2xl font-bold text-gray-100 mb-6">{t("messages")}</h1>
      <div className="space-y-4">
        {chatRooms.map((chat) => {
          const otherUser = chat.user1Id === currentUserId ? chat.user2 : chat.user1;

          return (
            <div
              key={chat.id}
              className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div
                  onClick={() => router.push(`/chat/${chat.id}`)}
                  className="flex items-center flex-1 cursor-pointer"
                >
                  <Avatar
                    src={
                      otherUser.avatar
                        ? `${process.env.NEXT_PUBLIC_API_URL}${otherUser.avatar}`
                        : "/images/default-avatar.png"
                    }
                    size={48}
                    bordered={true}
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-semibold text-gray-100">{otherUser.username}</p>
                      {chat.unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">
                      Product ID: {chat.productId}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(chat.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleDeleteChat(chat.id)}
                    className="p-2 bg-transparent text-red-500 hover:bg-red-500/20 rounded-full"
                  >
                    <Trash2 size={20} />
                  </Button>
                </div>
              </div>
              <Accordion className="mt-2">
                <AccordionItem
                  key={`product-${chat.id}`}
                  aria-label={`Product Info for Chat ${chat.id}`}
                  title={
                    <div className="flex items-center gap-2 text-gray-300">
                      <Info size={16} />
                      {t("productInfo")}
                    </div>
                  }
                  className="bg-gray-900/50 rounded-md border border-gray-700"
                >
                  <div className="p-3 text-gray-200">
                    <h3 className="text-lg font-semibold">{chat.product.title}</h3>
                    <p className="text-sm mt-1">{t("description")}: {chat.product.description}</p>
                    <div className="flex items-center mt-2">
                      <p className="text-sm">
                        {t("price")}: {chat.product.price} {t("currency")}
                      </p>
                      <p className="ml-4 text-sm">
                        {t("status")}: {chat.product.status === "available" ? t("available") : t("sold")}
                      </p>
                    </div>
                    {chat.product.images && chat.product.images.length > 0 && (
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}${chat.product.images[0]}`}
                        alt={chat.product.title}
                        className="mt-3 w-32 h-32 object-cover rounded-md"
                      />
                    )}
                  </div>
                </AccordionItem>
              </Accordion>
            </div>
          );
        })}
        {chatRooms.length === 0 && (
          <p className="text-center text-gray-400">{t("noChats")}</p>
        )}
      </div>
    </div>
  );
}