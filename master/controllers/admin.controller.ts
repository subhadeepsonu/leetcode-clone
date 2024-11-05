import { Request, Response } from 'express';
export async function AdminLogin(req: Request, res: Response) {
    try {

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        });
        return
    }

}
export async function Adminregister(req: Request, res: Response) {
    try {

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        });
        return
    }

}