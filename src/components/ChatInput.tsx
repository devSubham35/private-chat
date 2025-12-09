interface ChatInputProps {
    value: string
    handleSend: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ChatInput = ({ value, onChange, handleSend }: ChatInputProps) => {
    return (
        <div className="w-full absolute bottom-0 lg:bottom-10 left-0 h-16 lg:h-24 flex items-center justify-center">
            <div className="w-full lg:w-[90%] xl:w-1/2 h-full flex items-center gap-3 bg-zinc-900/60 px-2 lg:px-6 py-3 lg:py-5">
                <input
                    autoFocus
                    value={value}
                    onChange={onChange}
                    placeholder="Type your message..."
                    className="w-full text-sm lg:text-base border border-zinc-600/80 py-3 px-4 bg-zinc-950 h-full outline-none ring-0 focus:ring-0"
                />

                <button
                    onClick={handleSend}
                    className="h-full px-4 lg:px-10 py-1.5 bg-zinc-500/50 hover:bg-zinc-500/40 font-semibold 
                    cursor-pointer active:scale-95 transition-transform text-sm lg:text-base"
                >
                    SEND
                </button>
            </div>
        </div>
    )
}

export default ChatInput