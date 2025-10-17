const express = require('express');
const cors = require('cors');
const { PORT } = require("./config");
const app = express();

// Middlewares
app.use(cors()); // Permite peticiones de cualquier origen
app.use(express.json({ limit: '50mb' })); // Aumenta el límite del payload para imágenes en base64

// Exportar Rutas
const profile_routes = require('./routes/ProfileRoute');
const state_routes = require('./routes/StateRoute');
const category_routes = require('./routes/CategoryRoutes');
const new_routes = require('./routes/NewRoute');
const user_routes = require('./routes/UserRoute');
const auth_routes = require('./routes/AuthRoute');

// Usar las rutas
app.use('/api/perfiles', profile_routes);
app.use('/api/estados', state_routes);
app.use('/api/categorias', category_routes);
app.use('/api/noticias', new_routes);
app.use('/api/usuarios', user_routes);
app.use('/api/auth', auth_routes); // Se cambió la ruta base para autenticación

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

module.exports = app;