import z from 'zod';
export const userLoginValidator = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});
export const loginRegisterValidator = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});