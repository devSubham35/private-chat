import { client } from "@/lib/client";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

const useRoom = () => {

    const router = useRouter();

    //////////////////////////////////////
    /// Create room
    //////////////////////////////////////

    const { mutate: createRoomMutate, isPending: isCreateRoomPending } = useMutation({
        mutationKey: ["create-room"],
        mutationFn: async (userId: string) => {
            const res = await client.room.create({ userId }).post();
            return res?.data
        },
        onSuccess: (res) => {
            localStorage.setItem("expiredAt", String(res?.data?.expiredAt))
            router.push(`/chat-room/${res?.data?.id}`)
        }
    });

    /// Create Secure Room
    const handleCreateRoom = (userId: string) => {
        createRoomMutate(userId);
    };


    //////////////////////////////////////
    /// Destroy room
    //////////////////////////////////////

    const { mutate: destroyRoomMutate, isPending: isDestroyRoomPending } = useMutation({
        mutationKey: ["destroy-room"],
        mutationFn: async (roomId: string) => {
            const res = await client.room["destroy-room"]({ id: roomId }).delete();
            return res?.data;
        },
        onSuccess: () => {
            router.push("/");
        }
    });


    /// Create Secure Room
    const handleDestroyRoom = (roomId: string) => {
        destroyRoomMutate(roomId);
    };


    return {
        handleCreateRoom,
        isCreateRoomPending,
        handleDestroyRoom,
        isDestroyRoomPending,
    }
}

export default useRoom
