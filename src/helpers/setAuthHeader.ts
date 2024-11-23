import { NextFunction, Request, Response } from "express"

const setAuthHeader = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken
    if (!accessToken) return
    req.headers["authorization"] = accessToken

    next()
}


export default setAuthHeader