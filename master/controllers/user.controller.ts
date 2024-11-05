import { Request, Response } from 'express';

export async function UserLogin(req: Request, res: Response) {
    try {

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        });
        return
    }

}

export async function UserRegister(req: Request, res: Response) {
    try {

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        });
        return
    }

}