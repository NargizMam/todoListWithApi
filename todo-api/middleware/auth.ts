import {Request, Response, NextFunction} from "express";

export interface RequestWithSomeThing {
    something?: string;
}
const auth = (req: RequestWithSomeThing, res: Response, next: NextFunction ) => {


    next();
};
export default auth;