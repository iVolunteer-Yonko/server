import { UnauthenticatedError } from "../errors/custumErrors.js"
import { verifyToken } from "../utils/tokenUtils.js"

export const authenticateUser = (req, res, next) => {
    const {token} = req.cookies
    if(!token){
        throw new UnauthenticatedError('invalid authentication')
    }

    try{
        const {userID, role} = verifyToken(token)
        req.user = {userID, role}
        next()
    } catch(error){
        throw new UnauthenticatedError('invalid authentication')
    }
}