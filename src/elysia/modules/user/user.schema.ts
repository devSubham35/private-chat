import { Static, t } from "elysia"

export const userSchema = {
    create: t.Object({
        name: t.String(),
        email: t.String(),
    })
}

export type CreateUpdateUserBody = Static<typeof userSchema.create>;
