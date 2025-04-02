"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import LeftBar from "./components/leftbar/leftbar";
import ChatUser from "./components/chatuser/chatuser";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    //window.localStorage.clear()
    const ip = window.localStorage.getItem('ip')
    const fingerprint = window.localStorage.getItem('fingerprint')
    const token = window.localStorage.getItem('token')
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL_DEV}/me`, 
          {
            params: { fingerprint, ip },
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        
    
        window.localStorage.setItem('userinfo', JSON.stringify(response.data)); 
        console.log(response.data);
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