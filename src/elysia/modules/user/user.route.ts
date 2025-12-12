import { Elysia, } from "elysia";
import { userSchema } from "./user.schema";
import { userController } from './user.controller';

export const userModule = new Elysia({ prefix: "/user" })
    .get("/", userController.getUsers)
    .get('/:id', ({ params: { id } }) => userController.getUserById(id))
    .post('/create',
        ({ body }) => userController.createUser(body),
        { body: userSchema.create }
    )
    .post('/update/:id',
        ({ body, params: { id } }) => userController.updateUser(body, id),
        { body: userSchema.create }
    )