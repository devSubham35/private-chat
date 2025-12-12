import prisma from "@/lib/db";
import { ApiError } from "@/lib/ApiError";
import { ApiResponse } from "@/lib/ApiResponse";
import { CreateUpdateUserBody } from "./user.schema";

export const userController = {

    ///////////////////////////////////
    /// Fetch The User List
    ///////////////////////////////////

    getUsers: async () => {
        const users = await prisma.user.findMany();

        if (!users) {
            throw new ApiError("Failed to fetch User", 400)
        }

        return ApiResponse(200, "Users fetched", users);
    },

    ///////////////////////////////////
    /// Fetch user by id
    ///////////////////////////////////

    getUserById: async (id: string) => {

        if (!id) {
            throw new ApiError("User id is required", 400)
        }

        const existingUser = await prisma.user.findUnique({ where: { id } });

        if (!existingUser) {
            throw new ApiError("User is not exist", 400)
        }

        return ApiResponse(200, "User fetched", existingUser);
    },

    ///////////////////////////////////
    /// Create New User
    ///////////////////////////////////

    createUser: async (body: CreateUpdateUserBody) => {

        const { email, name } = body;

        const isExisting = await prisma.user.findFirst({
            where: { email }
        });

        if (isExisting) {
            throw new ApiError("User already exists", 400)
        }

        const newUser = await prisma.user.create({
            data: { name, email }
        });

        return ApiResponse(201, "User created Successfully", newUser);
    },

    ///////////////////////////////////
    /// Update User
    ///////////////////////////////////

    updateUser: async (body: CreateUpdateUserBody, id: string) => {

        const { email, name } = body;

        const existingUser = await prisma.user.findUnique({ where: { id } });

        if (!existingUser) {
            throw new ApiError("User not exists", 400)
        }

        /// Only check email when it’s different
        if (email !== existingUser.email) {
            const emailUsed = await prisma.user.findUnique({
                where: { email }
            });

            if (emailUsed) {
                throw new ApiError("Email already in use", 400);
            }
        }

        if (name) existingUser.name = name;
        if (email) existingUser.email = email;

        const updatedUser = await prisma.user.update({
            where: { id },
            data: existingUser
        });

        return ApiResponse(201, "User updated Successfully", updatedUser);
    }
}