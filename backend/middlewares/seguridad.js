const jwt = require('jsonwebtoken');
require('dotenv').config();

const autenticacionMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new Error('Token de autenticación no proporcionado');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id, usuario, rol } = decoded;
        req.usuarioAutenticado = { id, usuario, rol };

        next();
    } catch (error) {
        res.status(401).json({ error: 'Acceso no autenticado' });
    }
};

const autorizacionMiddleware = (rolPermitido) => {
    return (req, res, next) => {
        try {
            const rolUsuario = req.usuarioAutenticado.rol;

            if (rolUsuario !== rolPermitido) {
                throw new Error('Acceso no autorizado');
            }

            next();
        } catch (error) {
            res.status(403).json({ error: 'Acceso prohibido' });
        }
    };
};

module.exports = {
    autenticacionMiddleware,
    autorizacionMiddleware,
};
