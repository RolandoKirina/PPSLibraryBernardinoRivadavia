import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.status(401).json({ msg: 'Token requerido' });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ msg: 'Token invalido' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    }
    catch (error) {
        console.error(error);
        return res.status(401).json({ msg: 'Token invalido o expirado' });
    }
}