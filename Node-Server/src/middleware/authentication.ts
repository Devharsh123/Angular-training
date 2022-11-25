import { NextFunction, Request, Response } from "express"
import * as Jwt from "jsonwebtoken"
import { JwtAuthPayload } from "../dto/UserDto"

export const authorization = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader =
    req.headers.authorization || req.body.token || req.query.token || req.headers["x-access-token"] || req.body.headers["x-access-token"]
    if (!authHeader) {
        return res.status(403).send("A token is required for authentication")
    }
    try {
        const decoded = Jwt.verify(authHeader, 'sfglsfiglsifuafffisg765' as Jwt.Secret) as Jwt.JwtPayload
        req[req.method === 'GET' ? 'query' : 'body'] = { ...req[req.method === 'GET' ? 'query' : 'body'], ...decoded.payload as JwtAuthPayload };
        return next()
    } catch (err) {
        return res.status(401).send("Invalid Token")
    }
}

