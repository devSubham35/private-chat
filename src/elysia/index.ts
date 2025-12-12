import { ApiError } from "@/lib/ApiError";
import { Elysia, NotFoundError } from "elysia";
import { ApiResponse } from "@/lib/ApiResponse";
import { userModule } from "./modules/user/user.route";
import { room } from "./modules/room";

export const app = new Elysia({ prefix: "/api" })

    /// Global Error Handler
    .onError(({ error, set }) => {
        if (error instanceof ApiError) {
            set.status = error.status;
            return ApiResponse(error.status, error.message);
        } else if (error instanceof NotFoundError && error?.code === "NOT_FOUND") {
            return ApiResponse(404, "Api not found!");
        }

        console.error(error);

        set.status = 500;
        return ApiResponse(500, "Internal Server Error");
    })


    // Modules
    .use(userModule)
    .use(room);
