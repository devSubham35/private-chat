import { useEffect, useRef } from 'react'

const ChatSection = ({ chats }: { chats: string[] }) => {

    const chatEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chats]);


    return (
        <div className="w-[90%] xl:w-1/2 h-full flex flex-col gap-3 py-1 lg:py-5 overflow-y-scroll scrollbar-hide pt-3 lg:pt-5 no-scrollbar">
            {chats.map((msg, index) => (
                <div
                    key={index}
                    className="
                        rounded-lg rounded-tl-none odd:rounded-tr-none bg-zinc-800 px-3 py-2 
                        w-fit max-w-[70%] lg:max-w-[50%] flex odd:self-end flex-col 
                        text-sm lg:text-base wrap-break-word
                    "
                >
                    <h1 className="text-white">{msg}</h1>
                    <p className="mt-0.5 text-xs lg:text-sm text-zinc-400 self-end">
                        09:05am
                    </p>
                </div>
            ))}

            <div ref={chatEndRef} />
        </div>
    )
}

export default ChatSection
