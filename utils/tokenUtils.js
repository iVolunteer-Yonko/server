import jwt from 'jsonwebtoken';

export const createToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    return token;
};

export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        return decoded
      } catch (error) {
        throw new UnauthenticatedError('Invalid or expired token')
      }
}