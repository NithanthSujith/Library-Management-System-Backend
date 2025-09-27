import type { Request, Response } from "express";
export declare const createUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllUsers: (req: Request, res: Response) => Promise<void>;
export declare const getUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const makeUserAdmin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getUserDetails: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=users.controllers.d.ts.map