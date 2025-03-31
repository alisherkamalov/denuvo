"use client";
import "./styles.css";
import Image from "next/image";
import React, { useRef, useState, useCallback } from "react";
import { debounce } from "lodash";
import DefaultAvatar from "@/app/assets/defaultavatar.png"
interface ChatUser {
  id: number;
  avatar: string;
  last_message: string;
  name: string;
  link: string;
  time_last_message: string;
  new_message: number;
}

const LeftBar: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ChatUser[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const scrollChats = useRef<HTMLDivElement | null>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const [chats, setChats] = useState<ChatUser[]>([
    {
      id: 1,
      last_message: 'GO BEYOND',
      name: 'AllMight',
      avatar: 'https://bleedingcool.com/wp-content/uploads/2020/09/Its_All_Right-900x900.jpg',
      time_last_message: '19:23',
      new_message: 1,
      link: '@AllMight'
    },
  ]);

  const searchUsers = useCallback(
    debounce(async (query: string) => {
      if (!query.startsWith('@') || query.length < 3) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      const searchTerm = query.substring(1);

      try {
        

        
      } catch (err) {
        console.error('Failed to search:', err);
      } finally {
        setIsSearching(false);
      }
    }, 300),
    []
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollChats.current) return;
    isDown.current = true;
    startX.current = e.pageX - scrollChats.current.offsetLeft;
    scrollLeft.current = scrollChats.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !scrollChats.current) return;
    const x = e.pageX - scrollChats.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollChats.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div className="left-bar flex-1 h-dvh border-r max-w-81 min-w-81 overflow-hidden">
      <div className="header-bar w-full h-15 border-b flex items-center gap-2">
        <button className="btn-menu flex w-10 h-10 ml-2 rounded-full justify-center items-center bg-transparent hover:bg-[#c7c7c740] active:bg-[#c7c7c780] transition-all">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8aa9d6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>
        <div className="relative w-62 mr-4">
          {!isFocused && (
            <svg
              className="absolute left-3 top-[19px] transform -translate-y-1/2 w-5 h-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#a9a9a9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          )}

          <input
            placeholder={!isFocused ? "Поиск" : ""}
            className="searchinput mr-4 flex items-center w-62 h-10 bg-[#c7c7c740] focus:bg-[#c7c7c780] rounded-full caret-[#8aa9d6] pl-7 transition-all"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={searchQuery}
            onChange={(e) => {
              const query = e.target.value;
              setSearchQuery(query);
              searchUsers(query);
            }}
          />
        </div>
      </div>

      {(
        <div className="opensearchinput w-full h-[calc(100dvh-60px)] overflow-y-auto">
          {isSearching ? (
            <div className="loadingtext flex justify-center p-4">Загрузка...</div>
          ) : searchResults.length > 0 ? (
            searchResults.map((user) => (
              <div key={user.id} className="chat flex transition-all w-full h-20 hover:bg-[#c7c7c740] active:bg-[#c7c7c780] items-center">
                <Image
                  src={user.avatar || DefaultAvatar}
                  alt={user.name}
                  key={user.avatar}
                  className="avatar max-w-15 rounded-full ml-3 mr-3"
                />
                <div className="infouser flex flex-col w-full h-20 justify-center">
                    <span className="usernametext">
                      {user.name}
                    </span>
                    <span className="userlinktext">
                    {user.link}
                    </span>
                </div>
              </div>
            ))
          ) : searchQuery.startsWith('@') && searchQuery.length > 1 ? (
            <div className="notfoundtext flex justify-center p-4">Ничего не найдено</div>
          ) : null}
        </div>
      )}

      <div
        ref={scrollChats}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="chats flex-col max-w-81 overflow-y-auto h-[calc(100dvh-60px)] custom-scroll"
      >
        {chats.map((chat) => (
          <div key={chat.id} className="chat flex transition-all w-full h-20 hover:bg-[#c7c7c740] active:bg-[#c7c7c780] items-center">
            <Image
              width={60}
              height={60}
              src={chat.avatar}
              alt={chat.name}
              key={chat.avatar}
              className="avatar max-w-15 rounded-full ml-3 mr-3"
            />
            <div className="infouser flex-col flex flex-3 h-20 justify-center">
              <div className="usernamecont">
                <span className="usernametext text-gray-900 dark:text-white">{chat.name}</span>
              </div>
              <div className="messagecont">
                <span className="messagetext">{chat.last_message}</span>
              </div>
            </div>
            <div className="timecont flex-col flex flex-1 h-20 items-end mr-4 justify-center gap-1">
              <span className="timetext">{chat.time_last_message}</span>
              {chat.new_message > 0 && (
                <div className="circlenewmessage rounded-full w-5 h-5 bg-[#8aa9d6] flex justify-center items-center">
                  {chat.new_message}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftBar;