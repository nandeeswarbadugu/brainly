import { Request,Response,NextFunction } from 'express'
import jwt, {JwtPayload} from 'jsonwebtoken'
import { JWT_USER } from '../config';
export const userMiddleWare = async (req: Request,res:Response, next:NextFunction) => {
    
    const header = req.headers["authorization"];
    const decoded = jwt.verify(header as string, JWT_USER)

    if (decoded) {
        if (typeof decoded === "string") {
            res.status(403).json({
                message: "You are not logged in"
            })

        }
        
        // req.userId = (decoded as JwtPayload).id;
        req.userId = (decoded as JwtPayload).id;
        next();
    }
    else {
       
        res.status(403).json({
            message: "you are not logged in"
        })
    }


}