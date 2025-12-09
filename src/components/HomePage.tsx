"use client"

import { useRouter } from "next/navigation"

const HomePage = () => {

    const router = useRouter();

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center gap-8 p-4 lg:p-0">

            <div className="text-center">
                <h1 className="text-green-500 text-[18px] lg:text-xl mb-1">&gt;private_chat</h1>
                <h4 className="text-zinc-500 text-[14px] lg:text-base">A private, self distructive chat room</h4>
            </div>

            <div className="w-[90%] lg:w-lg min-h-20 border border-zinc-600/80 bg-zinc-900 space-y-2 p-5 lg:p-8">
                <h4 className="text-zinc-500 text-[14px] lg:text-base">Your identity</h4>
                <input
                    className="w-full border border-zinc-600/80 py-3 px-4 bg-zinc-950 text-[14px] lg:text-base"
                    placeholder="ggeoi64598464gnrekhn454"
                />
                <button
                    onClick={() => router.push("/chat-room/ggeoi64598464gnrekhn454")}
                    className="w-full py-3 flex justify-center items-center bg-white text-zinc-800 font-bold mt-4 
        cursor-pointer hover:bg-white/80 transition-colors duration-300 text-[14px] lg:text-base">
                    CREATE SECURE ROOM
                </button>
            </div>
        </div>
    )
}

export default HomePage