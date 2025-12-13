import prisma from './lib/db';
import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {

    const pathname = request.nextUrl.pathname;
    const metaData = pathname.split("/");

    const roomId = metaData[2];

    /// Check the room is existed or not
    const existingRoom = await prisma.room.findUnique({ where: { id: roomId } });

    if (!existingRoom) {
        return NextResponse.redirect(new URL("/?error=room-not-found", request?.url))
    }

    //////////////////////////////////////
    /// Check user already exist or not in the room
    //////////////////////////////////////

    const existingToken = request.cookies.get("X-acess-token")?.value;

    if (existingToken && existingRoom?.connected.includes(existingToken)) {
        return NextResponse.next();
    }

    //////////////////////////////////////
    /// /// Check the room is full or not
    //////////////////////////////////////

    if (existingRoom?.connected?.length >= 2) {
        return NextResponse.redirect(new URL("/?error=room-full", request?.url))
    }

    //////////////////////////////////////
    //////////////////////////////////////



    const response = NextResponse.next();

    /// Generate the token and set in to cookie
    const token = nanoid(12);

    response.cookies.set("X-acess-token", token,
        {
            path: "/",
            httpOnly: true,
            sameSite: true,
            secure: process.env.NODE_ENV === "production",
        })

    if (existingRoom?.connected.includes(token)) {
        return response
    }

    /// Set the token in to db
    await prisma.room.update({
        where: { id: roomId },
        data: {
            connected: [...existingRoom?.connected, token]
        }
    })

    return response;
}


export const config = {
    matcher: '/chat-room/:path*',
}