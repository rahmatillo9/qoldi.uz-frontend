
'use client'

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { io, Socket } from "socket.io-client";
import API from "@/lib/axios";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "@/ui/components/add-product/types";
import { ChatRoom, Message } from "@/ui/components/chat/type";

export function useChatPage() {
  const router = useRouter();
  const params = useParams();
  const chatId = params.chatId as string;
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
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

  // Chat room ma'lumotlarini olish
  useEffect(() => {
    if (!currentUserId || !chatId) return;

    const fetchChatRoom = async () => {
      try {
        setLoading(true);
        const response = await API.get<ChatRoom>(`/chat-room/${chatId}`);
        setChatRoom(response.data);
        setMessages(response.data.messages || []);
      } catch (err) {
        setError("Chatni yuklashda xato yuz berdi.");
        console.error("Chatni olishda xato:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChatRoom();
  }, [currentUserId, chatId]);

  // Socket.io ulanishini o'rnatish
  useEffect(() => {
    if (!currentUserId || !chatId) return;

    socketRef.current = io(process.env.NEXT_PUBLIC_API_MESSAGEURL!, {
      transports: ["websocket"],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current.on("connect", () => {
      console.log("Socket connected");
      socketRef.current?.emit("joinChat", currentUserId);
      socketRef.current?.emit("get_all_messages", parseInt(chatId));
    });

    socketRef.current.on("new_message", (message: Message) => {
      if (message.chatRoomId === parseInt(chatId)) {
        setMessages((prev) => [...prev, message]);
      }
    });

    socketRef.current.on("loadMessages", (response: Message[]) => {
      setMessages(response || []);
    
      // Xabarlarni o‘qilgan deb belgilash
      response?.forEach((msg) => {
        if (
          msg.receiverId === currentUserId &&
          msg.isRead === false
        ) {
          
          
          socketRef.current?.emit("mark_as_seen", {
            messageId: msg.id,
            userId: currentUserId,
          });
        }
      });
    });
    
    socketRef.current.on("error", (error: { message: string }) => {
      console.error("Socket error:", error.message);
      setError(error.message);
    });

    socketRef.current.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [currentUserId, chatId]);

  // Xabarlarni pastga scroll qilish
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Xabar yuborish
  const handleSendMessage = () => {
    if (!newMessage.trim() || !chatRoom || !currentUserId) return;

    const messageDto = {
      productId: chatRoom.productId,
      senderId: currentUserId,
      receiverId: chatRoom.user1Id === currentUserId ? chatRoom.user2Id : chatRoom.user1Id,
      content: newMessage,
      chatRoomId: parseInt(chatId),
    };

    socketRef.current?.emit("send_message", messageDto, (response: any) => {
      if (response?.error) {
        console.error("Xabar yuborishda xato:", response.error);
        setError("Xabar yuborishda xato yuz berdi.");
      } else {
        setNewMessage("");
      }
    });
  };

  const otherUser = chatRoom
    ? chatRoom.user1Id === currentUserId
      ? chatRoom.user2
      : chatRoom.user1
    : null;

  return {
    chatRoom,
    messages,
    newMessage,
    setNewMessage,
    currentUserId,
    messagesEndRef,
    handleSendMessage,
    loading,
    error,
    otherUser,
  };
}
