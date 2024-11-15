import jwt from 'jsonwebtoken';

export const createToken = (payload) => {
    const token = jwt.sign(payload, 'secret', {
        expiresIn: '1d'
    });
    return token;
};

export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, 'secret')
        return decoded
      } catch (error) {
        throw new UnauthenticatedError('Invalid or expired token')
      }
}