import type { NextFunction, Request, Response } from "express";
export declare const checkAuthorization: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const checkRole: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=authorizationMiddleware.d.ts.map