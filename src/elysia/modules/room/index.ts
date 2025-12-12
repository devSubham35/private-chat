import prisma from "@/lib/db";
import { Elysia, t, } from "elysia";
import { ApiError } from "@/lib/ApiError";
import { ApiResponse } from "@/lib/ApiResponse";

export const room = new Elysia({ prefix: "/room" })
    .post('/create/:userId',
        async ({ params: { userId } }) => {

            if (!userId) throw new ApiError("User id is required!", 400);

            const expiresAt = new Date(Date.now() + 30 * 1000);

            /// Create secure room
            const room = await prisma.room.create({
                data: {
                    connected: [String(userId)],
                    expiredAt: String(expiresAt)
                }
            });

            if (!room) throw new ApiError("Failed to create room!", 400);

            /// Delete the room after 10min automatically
            setTimeout(async () => {
                await prisma.room.delete({
                    where: { id: room?.id }
                })
            }, 20000);

            return ApiResponse(200, "Room created Succesfully!", room);
        }
    )
    .post('/join',
        async ({ body }) => {

            const { userId, roomId } = body;

            if (!userId) throw new ApiError("User id is required!", 400)
            if (!roomId) throw new ApiError("Room id is required!", 400)

            /// Check room is existed or not
            const existingRoom = await prisma.room.findUnique({ where: { id: roomId } });

            if (!existingRoom) throw new ApiError("Room not found!", 400)

            /// Check user already inside the room or not
            const isAlreadyInRoom = existingRoom?.connected?.includes(userId)

            /// If user not alrady joined room then will join
            if (!isAlreadyInRoom) {
                const room = await prisma.room.update({
                    where: { id: existingRoom?.id },
                    data: {
                        ...existingRoom,
                        connected: [...existingRoom?.connected, userId],
                    }
                })

                if (!room) {
                    throw new ApiError("Failed to join room!", 400)
                }
            } else {
                return ApiResponse(200, "You're already in the room!")
            }
            return ApiResponse(200, "Joined in room!", existingRoom?.expiredAt)
        },
        {
            body: t.Object({
                userId: t.String(),
                roomId: t.String(),
            })
        }
    )
    .delete('/destroy-room/:id',
        async ({ params: { id: roomId } }) => {

            if (!roomId) throw new ApiError("Room id is required!", 400)

            /// Check room is existed or not
            const existingRoom = await prisma.room.findUnique({ where: { id: roomId } });

            if (!existingRoom) throw new ApiError("Room not found!", 400)

            const destroyedRoom = await prisma.room.delete({ where: { id: existingRoom?.id } });

            if (!destroyedRoom) throw new ApiError("Failed to destroy room!", 400)

            return ApiResponse(200, "Room destroyed!");
        }
    )