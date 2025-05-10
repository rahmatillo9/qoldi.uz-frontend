
'use client'

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { io, Socket } from "socket.io-client";
import API from "@/lib/axios";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../components/add-product/types";
import { ChatModalProps, Message, ChatRoomResponse } from "./type";



export function useChat({ isOpen, product}: ChatModalProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatRoomId, setChatRoomId] = useState<number | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    if (!isOpen || !currentUserId) return;

    const initializeChat = async () => {
      try {
        const response = await API.get<ChatRoomResponse>(
          `/chat-room/product/${product.id}/user/${currentUserId}`
        );

        if (response.data && response.data.id) {
          setChatRoomId(response.data.id);
          setMessages(response.data.messages || []);
        } else {
          const createResponse = await API.post("/chat-room", {
            productId: product.id,
            user1Id: currentUserId,
            user2Id: product.user.id,
          });
          setChatRoomId(createResponse.data.id);
          setMessages([]);
        }
      } catch (error) {
        console.error("Chat room ma'lumotlarini olishda xato:", error);
        try {
          const createResponse = await API.post("/chat-room", {
            productId: product.id,
            user1Id: currentUserId,
            user2Id: product.user.id,
          });
          setChatRoomId(createResponse.data.id);
          setMessages([]);
        } catch (createError) {
          console.error("Chat room yaratishda xato:", createError);
        }
      }
    };

    initializeChat();
  }, [isOpen, currentUserId, product.id, product.user.id]);

  // Socket.io ulanishini o'rnatish
  useEffect(() => {
    if (!isOpen || !chatRoomId || !currentUserId) return;

    socketRef.current = io(process.env.NEXT_PUBLIC_API_MESSAGEURL!, {
      transports: ["websocket"],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current.on("connect", () => {
      console.log("Socket connected");
      socketRef.current?.emit("joinChat", currentUserId);
      socketRef.current?.emit("get_all_messages", chatRoomId);
    });

    socketRef.current.on("new_message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    socketRef.current.on("loadMessages", (response: Message[]) => {
      setMessages(response || []);
    
      // currentUserId hali tayyor bo‘lmasa, qayt
      if (!currentUserId) {
        console.log("currentUserId is null, skipping mark_as_seen");
        return;
      }
    
      // O'qilmagan xabarlarni belgilash
      (response || []).forEach((msg) => {
        if (msg.receiverId === currentUserId && !msg.isRead) {
          console.log("mark_as_seen emitted for message:", msg.id);
          socketRef.current?.emit("mark_as_seen", {
            messageId: msg.id,
            userId: currentUserId,
          });
        }
      });
    });
    

    socketRef.current.on("error", (error: { message: string }) => {
      console.error("Socket error:", error.message);
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
  }, [isOpen, chatRoomId, currentUserId]);

  // Xabarlarni pastga scroll qilish
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Xabar yuborish
  const handleSendMessage = () => {
    if (!newMessage.trim() || !chatRoomId || !currentUserId) return;

    const messageDto = {
      productId: product.id,
      senderId: currentUserId,
      receiverId: product.user.id,
      content: newMessage,
      chatRoomId: chatRoomId,
    };

    socketRef.current?.emit(
      "send_message",
      messageDto,
      (response: { error?: string }) => {
        if (response?.error) {
          console.error("Xabar yuborishda xato:", response.error);
        } else {
          setNewMessage("");
        }
      }
    );
  };

  return {
    messages,
    newMessage,
    setNewMessage,
    currentUserId,
    messagesEndRef,
    handleSendMessage,
  };
}
