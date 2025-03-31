"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import LeftBar from "./components/leftbar/leftbar";
import ChatUser from "./components/chatuser/chatuser";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        

        setUser(user);
        setLoading(false);
      } catch (err) {
        console.error('Auth error:', err);
        router.push('/login');
      }
    };

    checkAuth();

    

    
  }, [router]);

  if (loading) {
    return (
      <div className="flex w-full h-dvh justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="flex">
      <LeftBar />
      <ChatUser />
    </div>
  );
}