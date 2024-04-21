"use client";

import {
  useEffect,
  useState,
  useContext,
  createContext,
  useCallback,
} from "react";

import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

type ChatroomsContextType = {
  chatrooms;
  fetchChatrooms;
  deleteChatroom;
  addChatroom;
};

const ChatroomsContext = createContext<ChatroomsContextType | null>(null);

export function ChatroomsProvider({ children }: { children: React.ReactNode }) {
  const [chatrooms, setChatrooms] = useState([]);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const currentChatId = useParams().chatId;
  const router = useRouter();

  const fetchChatrooms = useCallback(async () => {
    const res = await fetch(`/api/chatrooms`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      return;
    }
    const data = await res.json();
    setChatrooms(data.chatrooms);
  }, []);

  useEffect(() => {
    if (!userId) return;
    fetchChatrooms();
  }, [userId, fetchChatrooms]);



  const deleteChatroom = async (chatId: string) => {
    const needToRedirect = currentChatId === chatId;

    const res = await fetch(`/api/chatrooms/${chatId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      return;
    }
    const data = await res.json();
    await fetchChatrooms();

    // if current chatroom is deleted, redirect to home page
    if (needToRedirect) {
      router.push("/chat");
    }

    return data;
  };

  const addChatroom = async (username: string) => {
    const res = await fetch(`/api/chatrooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      }),
    });
    if (!res.ok) {
      return res;
    }
    const data = await res.json();
    await fetchChatrooms();
    return data;
  };

  return (
    <ChatroomsContext.Provider
      value={{
        chatrooms,
        fetchChatrooms,
        deleteChatroom,
        addChatroom,
      }}
    >
      {children}
    </ChatroomsContext.Provider>
  );
}

export default function useChatrooms() {
  const context = useContext(ChatroomsContext);
  if (!context) {
    throw new Error("useChatrooms must be used within a ChatroomsProvider");
  }
  return context;
}
