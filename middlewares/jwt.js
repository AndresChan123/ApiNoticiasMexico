const jwt = require('jsonwebtoken');

const authenticateAdmin = (req, res, next) => {
    const authorization_header = req.headers.authorization;
    
    if (!authorization_header || !authorization_header.startsWith('Bearer ')) {
        return res.status(401).send({ message: 'No se proporcionó un token de autenticación válido' });
    }

    const token = authorization_header.split(' ')[1];

    jwt.verify(token, 'mi_llave_secreta', (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Token inválido o expirado' });
        }

        if (decoded.usuario.perfil_id === 1) { // 1 es Administrador
            req.user = decoded.usuario; // Opcional: añade el usuario a la request
            next();
        } else {
            return res.status(403).send({ message: 'Acceso denegado: se requieren permisos de administrador' });
        }
    });
};

const authenticateAny = (req, res, next) => {
    const authorization_header = req.headers.authorization;

    if (!authorization_header || !authorization_header.startsWith('Bearer ')) {
        return res.status(401).send({ message: 'No se proporcionó un token de autenticación válido' });
    }

    const token = authorization_header.split(' ')[1];

    jwt.verify(token, 'mi_llave_secreta', (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Token inválido o expirado' });
        }
        req.user = decoded.usuario; // Opcional: añade el usuario a la request
        next();
    });
};

module.exports = {
    authenticateAdmin,
    authenticateAny
};