"use client";

import { useState } from "react";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import ChatSection from "./ChatSection";

const ChatUI = () => {

    const [value, setValue] = useState("");
    const [chats, setChats] = useState(Array.from({ length: 25 }, () => "Hey Bro what's up, what are you doing right now bro!"));


    const handleSend = () => {
        if (!value.trim()) return;
        setChats((prev) => [...prev, value]);
        setValue("");
    };

    return (
        <div className="w-full h-screen relative">

            {/* HEADER */}
            <ChatHeader />

            {/* CHAT SECTION */}
            <div className="w-full h-[calc(100vh-205px)] lg:h-[calc(100vh-225px)] flex justify-center items-center overflow-hidden">
                <ChatSection chats={chats} />
            </div>

            {/* INPUT SECTION */}
            <ChatInput
                value={value}
                handleSend={handleSend}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
};

export default ChatUI;
